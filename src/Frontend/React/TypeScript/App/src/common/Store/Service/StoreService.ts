export interface StoreService {
  readonly createInitialState: <TState>(
    sliceNames: string[],
    functionToCreateState: () => TState
  ) => Map<string, TState>;
}
