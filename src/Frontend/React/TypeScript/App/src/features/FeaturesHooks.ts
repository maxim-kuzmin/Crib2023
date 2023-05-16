import { createStoresHooks } from '../stores';
import {
  type AppHooks,
  type AppNotificationStoreHooks,
  createAppHooks
} from './App';
import { type StoresHooks } from './Stores';

export interface FeaturesHooks {
  readonly App: AppHooks;
  readonly Stores: StoresHooks;
}

interface Options {
  readonly createAppNotificationStoreHooks: () => AppNotificationStoreHooks;
}

class Implementation implements FeaturesHooks {
  readonly App: AppHooks;
  readonly Stores: StoresHooks;

  constructor ({
    createAppNotificationStoreHooks
  }: Options) {
    this.App = createAppHooks({ createAppNotificationStoreHooks });
    this.Stores = createStoresHooks();
  }
}

export function createFeaturesHooks (options: Options): FeaturesHooks {
  return new Implementation(options);
}
