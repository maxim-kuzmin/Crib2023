export interface StoreService {
  readonly createInitialState: <TState>(
    slices: string[],
    functionToCreateState: () => TState
  ) => Map<string, TState>;
}

class Implementation implements StoreService {
  createInitialState<TState>(slices: string[], functionToCreateState: () => TState): Map<string, TState> {
    const result = new Map<string, TState>();

    slices.forEach((slice) => {
      result.set(slice, functionToCreateState());
    });

    return result;
  }
}

export function createStoreService (): StoreService {
  return new Implementation();
}
