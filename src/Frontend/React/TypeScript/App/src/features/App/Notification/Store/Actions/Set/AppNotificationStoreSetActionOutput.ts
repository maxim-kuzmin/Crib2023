import { type AppNotificationStoreSetActionDispatch } from './AppNotificationStoreSetActionDispatch';
import { type AppNotificationStoreSetActionPayload } from './AppNotificationStoreSetActionPayload';

export interface AppNotificationStoreSetActionOutput {
  readonly dispatchOfSetAction: AppNotificationStoreSetActionDispatch;
  readonly payloadOfSetAction: AppNotificationStoreSetActionPayload;
}
