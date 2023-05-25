import { type AppNotificationStoreSetActionDispatch } from './AppNotificationStoreSetActionDispatch';
import { type AppNotificationStoreSetActionResult } from './AppNotificationStoreSetActionResult';

export interface AppNotificationStoreSetActionOutput {
  readonly dispatchOfSetAction: AppNotificationStoreSetActionDispatch;
  readonly resultOfSetAction: AppNotificationStoreSetActionResult;
}
