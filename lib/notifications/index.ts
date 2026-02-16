// Central notification dispatcher

import { sendSlackNotification } from './slack';
import { sendDiscordNotification } from './discord';
import { sendEmailNotification } from './email';
import type { NotificationData, NotificationResult } from './types';

export * from './types';

export interface NotificationTargets {
  slack?: string;
  discord?: string;
  email?: string;
}

export interface NotificationResults {
  slack?: NotificationResult;
  discord?: NotificationResult;
  email?: NotificationResult;
  allSucceeded: boolean;
  anySucceeded: boolean;
}

/**
 * Send notifications to all configured targets in parallel
 * 
 * @param targets - Object containing Slack/Discord/Email webhook URLs/addresses
 * @param notification - Formatted notification data
 * @returns Results for each notification type
 */
export async function sendNotifications(
  targets: NotificationTargets,
  notification: NotificationData
): Promise<NotificationResults> {
  const promises: Promise<any>[] = [];
  const results: NotificationResults = {
    allSucceeded: true,
    anySucceeded: false
  };

  // Send to Slack if configured
  if (targets.slack) {
    promises.push(
      sendSlackNotification(targets.slack, notification)
        .then(result => {
          results.slack = result;
          if (result.success) results.anySucceeded = true;
          else results.allSucceeded = false;
        })
        .catch(error => {
          results.slack = { success: false, error: error.message };
          results.allSucceeded = false;
        })
    );
  }

  // Send to Discord if configured
  if (targets.discord) {
    promises.push(
      sendDiscordNotification(targets.discord, notification)
        .then(result => {
          results.discord = result;
          if (result.success) results.anySucceeded = true;
          else results.allSucceeded = false;
        })
        .catch(error => {
          results.discord = { success: false, error: error.message };
          results.allSucceeded = false;
        })
    );
  }

  // Send email if configured
  if (targets.email) {
    promises.push(
      sendEmailNotification(targets.email, notification)
        .then(result => {
          results.email = result;
          if (result.success) results.anySucceeded = true;
          else results.allSucceeded = false;
        })
        .catch(error => {
          results.email = { success: false, error: error.message };
          results.allSucceeded = false;
        })
    );
  }

  // Wait for all notifications to complete (in parallel)
  await Promise.all(promises);

  return results;
}
