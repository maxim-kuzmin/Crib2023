import { type AppNotificationStoreHooks } from '../../app';
import { type AppNotificationViewHooks } from './Notification';
import { createAppNotificationViewHooks } from './Notification/AppNotificationViewHooks';

export interface AppViewHooks {
  readonly Notification: AppNotificationViewHooks;
}

interface Options {
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
}

export function createAppViewHooks ({
  hooksOfAppNotificationStore
}: Options): AppViewHooks {
  const hooksOfNotification = createAppNotificationViewHooks({ hooksOfAppNotificationStore });

  return {
    Notification: hooksOfNotification
  };
}
