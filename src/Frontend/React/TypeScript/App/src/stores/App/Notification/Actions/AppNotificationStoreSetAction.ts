import {
  type AppNotificationStoreActionType,
  type AppNotificationStoreSetActionPayload
} from '../../../../all';

export interface AppNotificationStoreSetAction {
  type: AppNotificationStoreActionType.Set;
  payload: AppNotificationStoreSetActionPayload;
}
