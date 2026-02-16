import { NextRequest, NextResponse } from 'next/server';
import { sendNotifications, type NotificationData } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Generic webhook handler - tries to extract common deployment info
    const status = payload.status || payload.state || payload.result || 'UNKNOWN';
    const isSuccess = ['success', 'successful', 'ready', 'completed', 'deployed'].includes(
      status.toLowerCase()
    );
    const isFailed = ['failed', 'error', 'failure', 'cancelled', 'canceled'].includes(
      status.toLowerCase()
    );
    
    // Format notification message with generic fields
    const notification: NotificationData = {
      platform: 'Generic',
      status: isSuccess ? 'SUCCESS' : isFailed ? 'FAILED' : 'IN_PROGRESS',
      timestamp: new Date().toISOString(),
      data: {
        project: payload.project || payload.name || payload.repo || 'Unknown Project',
        environment: payload.environment || payload.target || payload.context || 'production',
        branch: payload.branch || payload.ref || 'main',
        commit: payload.commit || payload.sha || payload.commitId || null,
        url: payload.url || payload.deployUrl || payload.link || null,
        status: status,
      },
      notification: {
        title: `Deploy ${isSuccess ? 'Successful' : isFailed ? 'Failed' : 'In Progress'}`,
        message: `${payload.project || payload.name || 'Project'} deployment ${status}`,
        color: isSuccess ? '#00C853' : isFailed ? '#D32F2F' : '#FFA726',
        fields: [
          { name: 'Project', value: payload.project || payload.name || 'Unknown', inline: true },
          { name: 'Status', value: status, inline: true },
          { name: 'Environment', value: payload.environment || 'production', inline: true },
          { name: 'Branch', value: payload.branch || 'main', inline: true },
        ],
      },
    };
    
    // Log for debugging
    console.log('🔔 Generic Webhook Received:', {
      status: notification.status,
      project: notification.data.project,
      rawPayload: Object.keys(payload),
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
      message: 'Generic webhook received and notifications sent',
      notification,
      deliveryResults: results,
      debug: {
        payloadKeys: Object.keys(payload),
      },
    });
    
  } catch (error: any) {
    console.error('❌ Error processing generic webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
