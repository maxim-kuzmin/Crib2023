import { type NotificationType } from './NotificationType';

export interface NotificationData {
  type: NotificationType;
  message: string;
  description?: string;
}
