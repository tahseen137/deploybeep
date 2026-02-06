import { NextRequest, NextResponse } from 'next/server';

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
    const notification = {
      platform: 'Netlify',
      status: isSuccess ? 'SUCCESS' : isFailed ? 'FAILED' : 'IN_PROGRESS',
      timestamp: new Date().toISOString(),
      data: {
        site: payload.name || 'Unknown Site',
        url: deployUrl,
        environment: context,
        branch: branch,
        commit: payload.commit_ref?.substring(0, 7) || null,
        buildId: buildId,
        state: state,
      },
      notification: {
        title: `◆ Netlify Deploy ${isSuccess ? '✅ Successful' : isFailed ? '❌ Failed' : '⏳ Building'}`,
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
      message: 'Webhook received and processed',
      notification,
      debug: {
        slackConfigured: !!slackWebhook,
        discordConfigured: !!discordWebhook,
        emailConfigured: !!email,
      },
    });
    
  } catch (error) {
    console.error('❌ Error processing Netlify webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
