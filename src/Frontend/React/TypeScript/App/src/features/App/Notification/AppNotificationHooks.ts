import { type AppNotificationStoreHooks } from './Store';

export interface AppNotificationHooks {
  readonly Store: AppNotificationStoreHooks;
}

interface Options {
  readonly createAppNotificationStoreHooks: () => AppNotificationStoreHooks;
}

class Implementation implements AppNotificationHooks {
  readonly Store: AppNotificationStoreHooks;

  constructor ({
    createAppNotificationStoreHooks
  }: Options) {
    this.Store = createAppNotificationStoreHooks();
  }
}

export function createAppNotificationHooks (options: Options): AppNotificationHooks {
  return new Implementation(options);
}
