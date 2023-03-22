export async function getTestDataAsync<TData> (functionToGet: () => TData): Promise<TData> {
  return await new Promise((resolve, reject) => {
    setTimeout(() => { resolve(functionToGet()); }, 1000)
  })
};

export * from './Domains';
