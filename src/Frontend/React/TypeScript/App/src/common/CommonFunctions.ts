import { type NotificationControlProps } from './Controls';

export type SetNotification = (data: NotificationControlProps) => void;

export type ShouldBeCanceled = () => boolean;
