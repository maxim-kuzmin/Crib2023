export interface StoreActionPayload<TSliceName> {
  readonly sliceName: TSliceName;
}

export function createStoreActionPayload<TSliceName> (
  options: StoreActionPayload<TSliceName>
): StoreActionPayload<TSliceName> {
  const { sliceName } = options;

  return { sliceName };
}
