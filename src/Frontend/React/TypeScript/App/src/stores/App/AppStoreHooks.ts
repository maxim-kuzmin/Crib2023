import { type AppStoreHooks } from '../../features';
import { createAppNotificationStoreHooks } from './Notification/AppNotificationStoreHooks';

export function createAppStoreHooks (): AppStoreHooks {
  const hooksOfNotification = createAppNotificationStoreHooks();

  return {
    Notification: hooksOfNotification
  };
}
