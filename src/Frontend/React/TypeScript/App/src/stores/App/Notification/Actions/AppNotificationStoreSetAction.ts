import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type AppNotificationStoreSetActionPayload } from '../../../../features';
import { AppNotificationStoreActionType } from '../AppNotificationStoreActionType';

export interface AppNotificationStoreSetAction
  extends StoreActionWithPayload<AppNotificationStoreSetActionPayload> {
  readonly type: AppNotificationStoreActionType.Set;
}

export function createAppNotificationStoreSetAction (
  options: Omit<AppNotificationStoreSetAction, 'type'>
): AppNotificationStoreSetAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: AppNotificationStoreActionType.Set
  };
}
