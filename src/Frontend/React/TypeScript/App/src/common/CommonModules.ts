import { type HttpModule, createHttpModule } from './Http';
import { type TestModule, createTestModule } from './Test';

export interface CommonModules {
  readonly Http: HttpModule;
  readonly Test: TestModule;
}

class Implementation implements CommonModules {
  readonly Http: HttpModule;
  readonly Test: TestModule;

  constructor () {
    this.Http = createHttpModule();
    this.Test = createTestModule();
  }
}

export function createCommonModules (): CommonModules {
  return new Implementation();
}
