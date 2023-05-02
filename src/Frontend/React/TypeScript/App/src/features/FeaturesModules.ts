import { type TestModule } from './Test';
import { createTestModule } from './Test/TestModule';

export interface FeaturesModules {
  readonly Test: TestModule;
}

export function createFeaturesModules (): FeaturesModules {
  const moduleOfTest = createTestModule();

  return {
    Test: moduleOfTest,
  }
}
