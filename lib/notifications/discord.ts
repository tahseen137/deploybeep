import type { NotificationData, NotificationResult } from './types';

/**
 * Send deployment notification to Discord using webhook embeds
 * 
 * @param webhookUrl - Discord webhook URL (e.g., https://discord.com/api/webhooks/...)
 * @param notification - Formatted notification data
 * @returns Result with success status and optional error
 */
export async function sendDiscordNotification(
  webhookUrl: string,
  notification: NotificationData
): Promise<NotificationResult> {
  const startTime = Date.now();
  
  try {
    // Validate webhook URL
    if (!webhookUrl.includes('discord.com/api/webhooks/')) {
      throw new Error('Invalid Discord webhook URL');
    }

    // Convert hex color to decimal for Discord
    const colorHex = notification.notification.color.replace('#', '');
    const colorDecimal = parseInt(colorHex, 16);

    // Format fields for Discord embed
    const fields = notification.notification.fields.map(field => ({
      name: field.name,
      value: field.value || 'N/A',
      inline: field.inline ?? true
    }));

    // Determine emoji based on status
    const emoji = notification.status === 'SUCCESS' 
      ? '✅' 
      : notification.status === 'FAILED' 
        ? '❌' 
        : '⏳';

    // Create Discord embed
    const embed = {
      title: `${emoji} ${notification.notification.title}`,
      description: notification.notification.message,
      color: colorDecimal,
      fields: fields,
      footer: {
        text: `${notification.platform} Deployment`
      },
      timestamp: notification.timestamp
    };

    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        embeds: [embed]
      })
    });

    if (!response.ok) {
      // Discord rate limit handling
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        throw new Error(`Rate limited. Retry after ${retryAfter}s`);
      }
      
      const errorText = await response.text();
      throw new Error(`Discord API error (${response.status}): ${errorText}`);
    }

    const deliveryTime = Date.now() - startTime;
    console.log(`✅ Discord notification sent successfully (${deliveryTime}ms)`);
    
    return { 
      success: true, 
      deliveryTime 
    };

  } catch (error: any) {
    const deliveryTime = Date.now() - startTime;
    console.error('❌ Discord notification failed:', error);
    
    return { 
      success: false, 
      error: error.message || 'Unknown error',
      deliveryTime 
    };
  }
}
