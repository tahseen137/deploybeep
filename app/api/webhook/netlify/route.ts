import { NextRequest, NextResponse } from 'next/server';
import { sendNotifications, type NotificationData } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Extract Netlify deployment data
    const state = payload.state || 'unknown';
    const context = payload.context || 'production';
    const branch = payload.branch || 'main';
    const deployUrl = payload.deploy_ssl_url || payload.ssl_url || payload.url;
    const buildId = payload.id?.substring(0, 8) || 'unknown';
    
    const isSuccess = state === 'ready';
    const isFailed = state === 'error' || state === 'failed';
    
    // Format notification message
    const notification: NotificationData = {
      platform: 'Netlify',
      status: isSuccess ? 'SUCCESS' : isFailed ? 'FAILED' : 'IN_PROGRESS',
      timestamp: new Date().toISOString(),
      data: {
        project: payload.name || 'Unknown Site',
        site: payload.name || 'Unknown Site',
        url: deployUrl,
        environment: context,
        branch: branch,
        commit: payload.commit_ref?.substring(0, 7) || null,
        buildId: buildId,
        state: state,
      },
      notification: {
        title: `Netlify Deploy ${isSuccess ? 'Successful' : isFailed ? 'Failed' : 'Building'}`,
        message: `${payload.name || 'Site'} deployed to ${context}`,
        color: isSuccess ? '#00C853' : isFailed ? '#D32F2F' : '#FFA726',
        fields: [
          { name: 'Site', value: payload.name || 'Unknown', inline: true },
          { name: 'Context', value: context, inline: true },
          { name: 'Branch', value: branch, inline: true },
          { name: 'Build ID', value: buildId, inline: true },
          { name: 'State', value: state, inline: true },
          { name: 'URL', value: deployUrl || 'N/A', inline: false },
        ],
      },
    };
    
    // Log for debugging
    console.log('🔔 Netlify Webhook Received:', {
      status: notification.status,
      site: notification.data.site,
      state: state,
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
    console.error('❌ Error processing Netlify webhook:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
