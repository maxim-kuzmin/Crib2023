import { type HttpModule, createHttpModule } from './Http';
import { type StoreModule, createStoreModule } from './Store';

export interface CommonModules {
  readonly Http: HttpModule;
  readonly Store: StoreModule;
}

class Implementation implements CommonModules {
  readonly Http: HttpModule;
  readonly Store: StoreModule;

  constructor () {
    this.Http = createHttpModule();
    this.Store = createStoreModule();
  }
}

export function createCommonModules (): CommonModules {
  return new Implementation();
}
