import { type TestModule } from './Test';
import { createTestModule } from './Test/TestModule';

export interface FeaturesModule {
  readonly Test: TestModule;
}

export function createFeaturesModule (): FeaturesModule {
  const moduleOfTest = createTestModule();

  return {
    Test: moduleOfTest,
  }
}
