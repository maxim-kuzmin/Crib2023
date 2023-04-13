import {
  type StoreAction,
  type AppNotificationStoreActionType,
  type AppNotificationStoreSetActionPayload
} from '../../../../all';

export interface AppNotificationStoreSetAction extends StoreAction {
  type: AppNotificationStoreActionType.Set;
  payload: AppNotificationStoreSetActionPayload;
}
