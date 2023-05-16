import { type HttpModule, createHttpModule } from './Http';
import { type StoreModule, createStoreModule } from './Store';
import { type TestModule, createTestModule } from './Test';

export interface CommonModules {
  readonly Http: HttpModule;
  readonly Store: StoreModule;
  readonly Test: TestModule;
}

class Implementation implements CommonModules {
  readonly Http: HttpModule;
  readonly Store: StoreModule;
  readonly Test: TestModule;

  constructor () {
    this.Http = createHttpModule();
    this.Store = createStoreModule();
    this.Test = createTestModule();
  }
}

export function createCommonModules (): CommonModules {
  return new Implementation();
}
