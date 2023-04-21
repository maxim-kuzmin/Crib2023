import { type NotificationControlProps } from '../Controls';

export interface OperationHandlerOptions {
  functionToSetNotification: (data: NotificationControlProps) => void;
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}
