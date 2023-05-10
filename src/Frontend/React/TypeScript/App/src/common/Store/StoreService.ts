export interface StoreService {
  readonly createInitialState: <TState>(
    storeKeys: string[],
    functionToCreateState: () => TState
  ) => Map<string, TState>;
}

class Implementation implements StoreService {
  createInitialState<TState>(storeKeys: string[], functionToCreateState: () => TState): Map<string, TState> {
    const result = new Map<string, TState>();

    storeKeys.forEach((storeKey) => {
      result.set(storeKey, functionToCreateState());
    });

    return result;
  }
}

export function createStoreService (): StoreService {
  return new Implementation();
}
