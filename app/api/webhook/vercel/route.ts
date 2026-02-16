import { NextRequest, NextResponse } from 'next/server';
import { sendNotifications, type NotificationData } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Extract Vercel deployment data
    const deployment = payload.deployment || {};
    const project = payload.project || {};
    const team = payload.team || {};
    
    const deploymentStatus = deployment.state || 'UNKNOWN';
    const isSuccess = deploymentStatus === 'READY';
    const isFailed = deploymentStatus === 'ERROR' || deploymentStatus === 'CANCELED';
    
    // Format notification message
    const notification: NotificationData = {
      platform: 'Vercel',
      status: isSuccess ? 'SUCCESS' : isFailed ? 'FAILED' : 'IN_PROGRESS',
      timestamp: new Date().toISOString(),
      data: {
        project: project.name || 'Unknown Project',
        url: deployment.url || null,
        environment: deployment.target || 'production',
        branch: deployment.meta?.githubCommitRef || 'main',
        commit: deployment.meta?.githubCommitSha?.substring(0, 7) || null,
        author: deployment.meta?.githubCommitAuthorName || team.name || 'Unknown',
        message: deployment.meta?.githubCommitMessage || 'Deploy triggered',
        duration: deployment.ready ? `${Math.round((deployment.ready - deployment.createdAt) / 1000)}s` : null,
      },
      notification: {
        title: `Vercel Deploy ${isSuccess ? 'Successful' : isFailed ? 'Failed' : 'In Progress'}`,
        message: `${project.name || 'Project'} deployed to ${deployment.target || 'production'}`,
        color: isSuccess ? '#00C853' : isFailed ? '#D32F2F' : '#FFA726',
        fields: [
          { name: 'Project', value: project.name || 'Unknown', inline: true },
          { name: 'Environment', value: deployment.target || 'production', inline: true },
          { name: 'Branch', value: deployment.meta?.githubCommitRef || 'main', inline: true },
          { name: 'URL', value: deployment.url || 'N/A', inline: false },
        ],
      },
    };
    
    // Log for debugging
    console.log('🔔 Vercel Webhook Received:', {
      status: notification.status,
      project: notification.data.project,
      environment: notification.data.environment,
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
      message: 'Webhook received and notifications sent',
      notification,
      deliveryResults: results,
    });
    
  } catch (error: any) {
    console.error('❌ Error processing Vercel webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
