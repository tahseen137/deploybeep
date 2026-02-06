import { NextRequest, NextResponse } from 'next/server';

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
    const notification = {
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
        title: `🚂 Deploy ${isSuccess ? '✅ Successful' : isFailed ? '❌ Failed' : '⏳ In Progress'}`,
        message: `${payload.project || payload.name || 'Project'} deployment ${status}`,
        color: isSuccess ? '#00C853' : isFailed ? '#D32F2F' : '#FFA726',
        fields: [
          { name: 'Project', value: payload.project || payload.name || 'Unknown', inline: true },
          { name: 'Status', value: status, inline: true },
          { name: 'Environment', value: payload.environment || 'production', inline: true },
          { name: 'Branch', value: payload.branch || 'main', inline: true },
        ],
      },
      raw: payload, // Include raw payload for debugging
    };
    
    // Log for debugging
    console.log('🔔 Generic Webhook Received:', {
      status: notification.status,
      project: notification.data.project,
      rawPayload: Object.keys(payload),
    });
    
    // Check for notification channels
    const slackWebhook = request.nextUrl.searchParams.get('slack');
    const discordWebhook = request.nextUrl.searchParams.get('discord');
    const email = request.nextUrl.searchParams.get('email');
    
    if (slackWebhook) {
      console.log('📨 Would send to Slack:', slackWebhook);
    }
    if (discordWebhook) {
      console.log('📨 Would send to Discord:', discordWebhook);
    }
    if (email) {
      console.log('📨 Would send email to:', email);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Generic webhook received and processed',
      notification,
      debug: {
        slackConfigured: !!slackWebhook,
        discordConfigured: !!discordWebhook,
        emailConfigured: !!email,
        payloadKeys: Object.keys(payload),
      },
    });
    
  } catch (error) {
    console.error('❌ Error processing generic webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
