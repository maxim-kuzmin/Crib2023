import { type StoreActionOptions } from '../../../../../../common';
import { type AppNotificationStoreSetActionCallback } from './AppNotificationStoreSetActionCallback';
import { type AppNotificationStoreSetActionResult } from './AppNotificationStoreSetActionResult';

export interface AppNotificationStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: AppNotificationStoreSetActionCallback;
  readonly resultOfSetAction?: AppNotificationStoreSetActionResult;
}
