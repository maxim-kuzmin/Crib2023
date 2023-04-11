import {
  type AppNotificationStoreSetActionCallback,
  type StoreActionOptions,
  type AppNotificationStoreSetActionPayload
} from '../../../../../../all';

export interface AppNotificationStoreSetActionOptions extends StoreActionOptions {
  callback?: AppNotificationStoreSetActionCallback;
  payload?: AppNotificationStoreSetActionPayload;
}
