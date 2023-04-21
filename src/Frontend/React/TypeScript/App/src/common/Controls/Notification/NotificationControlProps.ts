import { type NotificationControlType } from './NotificationControlType';

export interface NotificationControlProps {
  type: NotificationControlType;
  message: string;
  description?: string;
}
