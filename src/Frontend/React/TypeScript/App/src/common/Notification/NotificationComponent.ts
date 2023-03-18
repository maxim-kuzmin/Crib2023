import { type ReactElement } from 'react';
import { type NotificationData } from '../../all';

export interface NotificationComponent {
  content: ReactElement;
  show: (input: NotificationData) => void;
}
