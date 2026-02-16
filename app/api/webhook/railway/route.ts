import { NextRequest, NextResponse } from 'next/server';
import { sendNotifications, type NotificationData } from '@/lib/notifications';

/**
 * Railway Webhook Handler
 * 
 * Railway webhook format (based on official docs):
 * {
 *   type: "Deployment.failed" | "Deployment.succeeded" | etc.,
 *   details: {
 *     id, source, status, branch, commitHash, commitAuthor, commitMessage
 *   },
 *   resource: {
 *     workspace: { id, name },
 *     project: { id, name },
 *     environment: { id, name, isEphemeral },
 *     service: { id, name },
 *     deployment: { id }
 *   },
 *   severity: "INFO" | "WARNING" | "ERROR",
 *   timestamp: ISO8601 string
 * }
 */

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Extract Railway webhook data
    const type = payload.type || '';
    const details = payload.details || {};
    const resource = payload.resource || {};
    const severity = payload.severity || 'INFO';
    const timestamp = payload.timestamp || new Date().toISOString();
    
    // Determine status from event type
    const isSuccess = type.includes('succeeded') || type.includes('success') || details.status === 'SUCCESS';
    const isFailed = type.includes('failed') || type.includes('error') || severity === 'ERROR';
    
    // Extract resource info
    const project = resource.project?.name || 'Unknown Project';
    const service = resource.service?.name || 'Unknown Service';
    const environment = resource.environment?.name || 'production';
    const workspace = resource.workspace?.name || '';
    
    // Format notification message
    const notification: NotificationData = {
      platform: 'Railway',
      status: isSuccess ? 'SUCCESS' : isFailed ? 'FAILED' : 'IN_PROGRESS',
      timestamp: timestamp,
      data: {
        project: project,
        service: service,
        environment: environment,
        workspace: workspace,
        branch: details.branch || 'main',
        commit: details.commitHash?.substring(0, 7) || null,
        author: details.commitAuthor || null,
        message: details.commitMessage || null,
        deploymentId: resource.deployment?.id || null,
        eventType: type,
      },
      notification: {
        title: `Railway Deploy ${isSuccess ? 'Successful' : isFailed ? 'Failed' : 'In Progress'}`,
        message: `${project} (${service}) deployed to ${environment}`,
        color: isSuccess ? '#00C853' : isFailed ? '#D32F2F' : '#FFA726',
        fields: [
          { name: 'Project', value: project, inline: true },
          { name: 'Service', value: service, inline: true },
          { name: 'Environment', value: environment, inline: true },
          { name: 'Branch', value: details.branch || 'main', inline: true },
          { name: 'Commit', value: details.commitHash?.substring(0, 7) || 'N/A', inline: true },
          { name: 'Author', value: details.commitAuthor || 'N/A', inline: true },
        ],
      },
    };
    
    // Add commit message if available
    if (details.commitMessage) {
      notification.notification.fields.push({
        name: 'Commit Message',
        value: details.commitMessage.substring(0, 100) + (details.commitMessage.length > 100 ? '...' : ''),
        inline: false,
      });
    }
    
    // Log for debugging
    console.log('🔔 Railway Webhook Received:', {
      type: type,
      status: notification.status,
      project: project,
      service: service,
      environment: environment,
    });
    
    // Get notification targets from query params
    const slackWebhook = request.nextUrl.searchParams.get('slack');
    const discordWebhook = request.nextUrl.searchParams.get('discord');
    const email = request.nextUrl.searchParams.get('email');
    
    // Send notifications to configured targets
    const results = await sendNotifications(
      {
        slack: slackWebhook || undefined,
        discord: discordWebhook || undefined,
        email: email || undefined,
      },
      notification
    );
    
    return NextResponse.json({
      success: true,
      message: 'Railway webhook received and notifications sent',
      notification,
      deliveryResults: results,
    });
    
  } catch (error: any) {
    console.error('❌ Error processing Railway webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
