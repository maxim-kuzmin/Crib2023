import { type ReactElement } from 'react';
import { type NotificationData } from './NotificationData';

export interface NotificationComponent {
  content: ReactElement
  show: (input: NotificationData) => void
}
