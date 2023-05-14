export interface StoreService {
  readonly createInitialState: <TState>(
    sliceNameNames: string[],
    functionToCreateState: () => TState
  ) => Map<string, TState>;
}

class Implementation implements StoreService {
  createInitialState<TState>(sliceNameNames: string[], functionToCreateState: () => TState): Map<string, TState> {
    const result = new Map<string, TState>();

    sliceNameNames.forEach((sliceName) => {
      result.set(sliceName, functionToCreateState());
    });

    return result;
  }
}

export function createStoreService (): StoreService {
  return new Implementation();
}
