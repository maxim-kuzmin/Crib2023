import { type TestService } from './TestService';
import { TestServiceImpl } from './TestServiceImpl';

export interface TestModule {
  readonly getService: () => TestService;
}

export function createTestModule (): TestModule {
  const implOfService = new TestServiceImpl();

  function getService (): TestService {
    return implOfService;
  }

  return { getService };
}
