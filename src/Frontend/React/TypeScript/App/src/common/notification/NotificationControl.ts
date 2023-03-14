import { type ReactElement } from 'react';
import { type NotificationData } from './NotificationData';

export interface NotificationControl {
  component: ReactElement
  show: (input: NotificationData) => void
}
