export type StoreStateMap<TState> = Record<string, TState>;

interface Options<TState> {
  readonly functionToCreateState?: () => TState;
  readonly sliceNames?: string[];
  readonly stateMap?: StoreStateMap<TState>;
}

export function createStoreStateMap<TState> ({
  functionToCreateState,
  sliceNames,
  stateMap,
}: Options<TState>): StoreStateMap<TState> {
  let result: Record<string, TState>;

  if (sliceNames && functionToCreateState) {
    result = {};

    sliceNames.forEach((sliceName) => {
      result[sliceName] = functionToCreateState();
    });
  } else if (stateMap) {
    result = { ...stateMap };
  } else {
    result = {};
  }

  return result;
}
