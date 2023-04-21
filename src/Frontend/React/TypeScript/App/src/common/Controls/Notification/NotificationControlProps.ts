import { type NotificationControlType } from './NotificationControlType';

export interface NotificationControlProps {
  description?: string;
  message: string;
  type: NotificationControlType;
}
