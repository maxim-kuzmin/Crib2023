import { type TestModule, createTestModule } from '.';

export interface FeaturesModules {
  readonly Test: TestModule;
}

class Implementation implements FeaturesModules {
  readonly Test: TestModule;

  constructor () {
    this.Test = createTestModule();
  }
}
export function createFeaturesModules (): FeaturesModules {
  return new Implementation();
}
