export interface StoreActionWithPayload<TActionPayload> {
  readonly payload: TActionPayload;
}

export function createStoreActionWithPayload<TActionPayload> (
  options: StoreActionWithPayload<TActionPayload>
): StoreActionWithPayload<TActionPayload> {
  const { payload } = options;

  return { payload };
}
