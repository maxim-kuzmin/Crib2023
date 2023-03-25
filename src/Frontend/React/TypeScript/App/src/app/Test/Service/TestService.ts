export interface TestService {
  getDataAsync: <TData> (functionToGet: () => TData) => Promise<TData>;
}
