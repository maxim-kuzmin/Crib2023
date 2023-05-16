import { type AppLocalizationHooks, createAppLocalizationHooks } from './Localization';
import {
  type AppNotificationHooks,
  type AppNotificationStoreHooks,
  createAppNotificationHooks,
} from './Notification';

export interface AppHooks {
  readonly Localization: AppLocalizationHooks;
  readonly Notification: AppNotificationHooks;
}

interface Options {
  readonly createAppNotificationStoreHooks: () => AppNotificationStoreHooks;
}

class Implementation implements AppHooks {
  readonly Localization: AppLocalizationHooks;
  readonly Notification: AppNotificationHooks;

  constructor ({
    createAppNotificationStoreHooks
  }: Options) {
    this.Localization = createAppLocalizationHooks();
    this.Notification = createAppNotificationHooks({ createAppNotificationStoreHooks });
  }
}

export function createAppHooks (options: Options): AppHooks {
  return new Implementation(options);
}
