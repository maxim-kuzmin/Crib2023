import { type StoreActionOptions } from '../../../../../../common';
import { type AppNotificationStoreSetActionCallback } from './AppNotificationStoreSetActionCallback';
import { type AppNotificationStoreSetActionPayload } from './AppNotificationStoreSetActionPayload';

export interface AppNotificationStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: AppNotificationStoreSetActionCallback;
  readonly payloadOfSetAction?: AppNotificationStoreSetActionPayload;
}
