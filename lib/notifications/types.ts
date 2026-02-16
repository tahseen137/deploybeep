// Shared types for notifications

export interface NotificationField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface NotificationData {
  platform: string;
  status: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS';
  timestamp: string;
  data: {
    project: string;
    url?: string | null;
    environment: string;
    branch: string;
    commit?: string | null;
    author?: string | null;
    message?: string | null;
    duration?: string | null;
    [key: string]: any;
  };
  notification: {
    title: string;
    message: string;
    color: string;
    fields: NotificationField[];
  };
}

export interface NotificationResult {
  success: boolean;
  error?: string;
  deliveryTime?: number;
}
