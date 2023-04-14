import { type NotificationData } from '../Notification';

export interface OperationHandlerOptions {
  functionToSetNotification: (data: NotificationData) => void;
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}
