export interface StoreActionWithPayload<TActionPayload> {
  readonly payload: TActionPayload;
}

export function createStoreActionWithPayload<TActionPayload> (
  payload: TActionPayload
): StoreActionWithPayload<TActionPayload> {
  return { payload };
}
