import { type HttpModule } from './Http';
import { createHttpModule } from './Http/HttpModule';
import { type StoreModule } from './Store';
import { createStoreModule } from './Store/StoreModule';

export interface CommonModules {
  readonly Http: HttpModule;
  readonly Store: StoreModule;
}

export function createCommonModules (): CommonModules {
  const moduleOfHttp = createHttpModule();
  const moduleOfStore = createStoreModule();

  return {
    Http: moduleOfHttp,
    Store: moduleOfStore,
  };
}
