import { NotificationType, type NotificationData } from '../Notification';

export interface StoreDispatchHandler {
    readonly onError: (error: Error) => any;
}

class StoreDispatchHandlerImpl implements StoreDispatchHandler {
  constructor (
    private readonly functionToSetNotification: (data: NotificationData | null) => void
  ) {}

  onError (error: Error) {
    this.functionToSetNotification({
      type: NotificationType.Error,
      message: error.message
    })
  }
}

export function createStoreDispatchHandler (
  functionToSetNotification: (data: NotificationData | null) => void
): StoreDispatchHandler {
  return new StoreDispatchHandlerImpl(functionToSetNotification);
}
