import { type AppStoreHooks } from '../../app';
import { createAppNotificationStoreHooks } from './Notification/AppNotificationStoreHooks';

export function createAppStoreHooks (): AppStoreHooks {
  const hooksOfNotification = createAppNotificationStoreHooks();

  return {
    Notification: hooksOfNotification
  };
}
