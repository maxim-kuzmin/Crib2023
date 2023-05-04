import { type TestService, createTestService } from './TestService';

export interface TestModule {
  readonly getService: () => TestService;
}

class Implementation implements TestModule {
  private readonly service = createTestService();

  getService (): TestService {
    return this.service;
  }
}

export function createTestModule (): TestModule {
  return new Implementation();
}
