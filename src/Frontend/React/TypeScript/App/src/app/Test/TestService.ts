export interface TestService {
  getDataAsync: <TData> (functionToGet: () => TData) => Promise<TData>;
}

async function getDataAsync<TData> (functionToGet: () => TData): Promise<TData> {
  return await new Promise((resolve, reject) => {
    setTimeout(() => { resolve(functionToGet()); }, 1000)
  })
};

export function createTestService (): TestService {
  return {
    getDataAsync
  };
}
