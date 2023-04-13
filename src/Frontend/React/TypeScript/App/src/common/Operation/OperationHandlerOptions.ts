import { type NotificationData } from '../../all';

export interface OperationHandlerOptions {
  functionToSetNotification: (data: NotificationData) => void;
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}
