export interface TestService {
  readonly getDataAsync: <TData> (functionToGet: () => TData) => Promise<TData>;
}
