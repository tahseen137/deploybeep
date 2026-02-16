import { Resend } from 'resend';
import type { NotificationData, NotificationResult } from './types';

/**
 * Send deployment notification via email using Resend
 * 
 * @param recipientEmail - Email address to send to
 * @param notification - Formatted notification data
 * @returns Result with success status and optional error
 */
export async function sendEmailNotification(
  recipientEmail: string,
  notification: NotificationData
): Promise<NotificationResult> {
  const startTime = Date.now();
  
  try {
    // Check for API key
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const fromEmail = process.env.FROM_EMAIL || 'notifications@deploybeep.app';
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      throw new Error('Invalid email address');
    }

    const resend = new Resend(apiKey);

    // Determine emoji based on status
    const emoji = notification.status === 'SUCCESS' 
      ? '✅' 
      : notification.status === 'FAILED' 
        ? '❌' 
        : '⏳';

    // Create HTML email
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${notification.notification.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header {
      background-color: ${notification.notification.color};
      color: white;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #e0e0e0;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .field-name {
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      margin-bottom: 5px;
      font-weight: 600;
    }
    .field-value {
      font-size: 16px;
      color: #333;
      word-break: break-all;
    }
    .footer {
      background-color: #f9f9f9;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
    .message {
      font-size: 14px;
      color: #666;
      margin-bottom: 25px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${emoji} ${notification.notification.title}</h1>
    </div>
    <div class="content">
      <p class="message">${notification.notification.message}</p>
      ${notification.notification.fields.map(field => `
        <div class="field">
          <div class="field-name">${field.name}</div>
          <div class="field-value">${field.value || 'N/A'}</div>
        </div>
      `).join('')}
    </div>
    <div class="footer">
      <p>Sent by <strong>DeployBeep</strong> • ${notification.platform} Deployment</p>
      <p>${new Date(notification.timestamp).toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Plain text fallback
    const textContent = `
${notification.notification.title}

${notification.notification.message}

${notification.notification.fields.map(field => `${field.name}: ${field.value || 'N/A'}`).join('\n')}

---
Sent by DeployBeep • ${notification.platform} Deployment
${new Date(notification.timestamp).toLocaleString()}
    `.trim();

    // Send email
    const result = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: `${emoji} ${notification.notification.title}`,
      html: htmlContent,
      text: textContent
    });

    const deliveryTime = Date.now() - startTime;
    console.log(`✅ Email notification sent successfully (${deliveryTime}ms) - ID: ${result.data?.id}`);
    
    return { 
      success: true, 
      deliveryTime 
    };

  } catch (error: any) {
    const deliveryTime = Date.now() - startTime;
    console.error('❌ Email notification failed:', error);
    
    return { 
      success: false, 
      error: error.message || 'Unknown error',
      deliveryTime 
    };
  }
}
