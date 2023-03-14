import { type ReactElement } from 'react';
import { type NotificationInput } from './NotificationInput';

export interface NotificationControl {
  component: ReactElement
  show: (input: NotificationInput) => void
}
