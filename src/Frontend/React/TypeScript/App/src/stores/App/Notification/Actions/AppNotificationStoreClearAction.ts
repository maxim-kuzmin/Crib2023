import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type AppNotificationStoreClearActionPayload } from '../../../../features';
import { AppNotificationStoreActionType } from '../AppNotificationStoreActionType';

export interface AppNotificationStoreClearAction
  extends StoreActionWithPayload<AppNotificationStoreClearActionPayload> {
  readonly type: AppNotificationStoreActionType.Clear;
}

export function createAppNotificationStoreClearAction (
  payload: AppNotificationStoreClearActionPayload
): AppNotificationStoreClearAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: AppNotificationStoreActionType.Clear
  };
}
