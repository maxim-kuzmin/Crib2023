import { type ReactElement } from 'react';
import { type NotificationControlProps } from './NotificationControlProps';

export interface NotificationControlComponent {
  content: ReactElement;
  show: (props: NotificationControlProps) => void;
}
