import { type StoreAction, type AppNotificationStoreActionType } from '../../../../all';

export interface AppNotificationStoreClearAction extends StoreAction {
  type: AppNotificationStoreActionType.Clear;
}
