import { type NotificationType } from '../../all';

export interface NotificationData {
  type: NotificationType;
  message: string;
  description?: string;
}
