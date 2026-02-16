import { IncomingWebhook } from '@slack/webhook';
import type { NotificationData, NotificationResult } from './types';

/**
 * Send deployment notification to Slack using Incoming Webhooks
 * 
 * @param webhookUrl - Slack webhook URL (e.g., https://hooks.slack.com/services/...)
 * @param notification - Formatted notification data
 * @returns Result with success status and optional error
 */
export async function sendSlackNotification(
  webhookUrl: string,
  notification: NotificationData
): Promise<NotificationResult> {
  const startTime = Date.now();
  
  try {
    // Validate webhook URL
    if (!webhookUrl.startsWith('https://hooks.slack.com/')) {
      throw new Error('Invalid Slack webhook URL');
    }

    const webhook = new IncomingWebhook(webhookUrl);
    
    // Determine emoji based on status
    const emoji = notification.status === 'SUCCESS' 
      ? ':white_check_mark:' 
      : notification.status === 'FAILED' 
        ? ':x:' 
        : ':hourglass_flowing_sand:';

    // Convert hex color to Slack color
    const color = notification.notification.color.replace('#', '');
    
    // Format fields for Slack
    const fields = notification.notification.fields.map(field => ({
      title: field.name,
      value: field.value,
      short: field.inline ?? true
    }));

    // Send to Slack with Block Kit for rich formatting
    await webhook.send({
      text: `${emoji} ${notification.notification.title}`, // Fallback text
      attachments: [
        {
          color: color,
          title: notification.notification.title,
          text: notification.notification.message,
          fields: fields,
          footer: `${notification.platform} Deployment`,
          ts: Math.floor(new Date(notification.timestamp).getTime() / 1000).toString()
        }
      ]
    });

    const deliveryTime = Date.now() - startTime;
    console.log(`✅ Slack notification sent successfully (${deliveryTime}ms)`);
    
    return { 
      success: true, 
      deliveryTime 
    };

  } catch (error: any) {
    const deliveryTime = Date.now() - startTime;
    console.error('❌ Slack notification failed:', error);
    
    return { 
      success: false, 
      error: error.message || 'Unknown error',
      deliveryTime 
    };
  }
}
