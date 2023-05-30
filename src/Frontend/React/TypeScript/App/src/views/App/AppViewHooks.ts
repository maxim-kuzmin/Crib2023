import { type AppNotificationStoreHooks } from '../../features';
import { type AppNotificationViewHooks } from './Notification';
import { createAppNotificationViewHooks } from './Notification/AppNotificationViewHooks';

export interface AppViewHooks {
  readonly Notification: AppNotificationViewHooks;
}

interface Options {
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
}

class Implementation implements AppViewHooks {
  readonly Notification: AppNotificationViewHooks;

  constructor ({
    hooksOfAppNotificationStore
  }: Options) {
    this.Notification = createAppNotificationViewHooks({ hooksOfAppNotificationStore });
  }
}
export function createAppViewHooks (options: Options): AppViewHooks {
  return new Implementation(options);
}
