export interface TestService {
  readonly getDataAsync: <TData> (functionToGet: () => TData) => Promise<TData>;
}

class Implementation implements TestService {
  async getDataAsync<TData> (functionToGet: () => TData): Promise<TData> {
    return await new Promise((resolve, reject) => {
      setTimeout(() => { resolve(functionToGet()); }, 1000)
    });
  }
}

export function createTestService (): TestService {
  return new Implementation();
}
