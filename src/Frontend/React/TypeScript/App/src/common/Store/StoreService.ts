export interface StoreService {
  readonly createInitialState: <TState>(
    owners: string[],
    functionToCreateState: () => TState
  ) => Map<string, TState>;
}

class Implementation implements StoreService {
  createInitialState<TState>(owners: string[], functionToCreateState: () => TState): Map<string, TState> {
    const result = new Map<string, TState>();

    owners.forEach((owner) => {
      result.set(owner, functionToCreateState());
    });

    return result;
  }
}

export function createStoreService (): StoreService {
  return new Implementation();
}
