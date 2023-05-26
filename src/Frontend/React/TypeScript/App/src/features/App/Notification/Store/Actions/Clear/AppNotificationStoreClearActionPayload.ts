import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type AppNotificationStoreSliceName } from '../../Slice';

export interface AppNotificationStoreClearActionPayload
  extends StoreActionPayload<AppNotificationStoreSliceName> {
}

export function createAppNotificationStoreClearActionPayload (
  options: AppNotificationStoreClearActionPayload
): AppNotificationStoreClearActionPayload {
  return createStoreActionPayload(options);
}
