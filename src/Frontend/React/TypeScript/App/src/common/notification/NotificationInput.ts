import { type NotificationType } from './NotificationType';

export interface NotificationInput {
  type: NotificationType
  message: string
  description?: string
}
