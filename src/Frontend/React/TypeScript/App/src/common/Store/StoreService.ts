export interface StoreService {
  readonly createInitialState: <TState>(
    sliceNames: string[],
    functionToCreateState: () => TState
  ) => Map<string, TState>;
}

class Implementation implements StoreService {
  createInitialState<TState>(sliceNames: string[], functionToCreateState: () => TState): Map<string, TState> {
    const result = new Map<string, TState>();

    sliceNames.forEach((sliceName) => {
      result.set(sliceName, functionToCreateState());
    });

    return result;
  }
}

export function createStoreService (): StoreService {
  return new Implementation();
}
