import { type AppStoreHooks } from '../../features';
import { createAppNotificationStoreHooks } from './Notification';

export function createAppStoreHooks (): AppStoreHooks {
  const hooksOfNotification = createAppNotificationStoreHooks();

  return {
    Notification: hooksOfNotification
  };
}
