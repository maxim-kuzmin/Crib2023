import { type AppNotificationStoreSetActionResult } from './AppNotificationStoreSetActionResult';

export interface AppNotificationStoreSetActionDispatch {
  readonly run: (actionResult: AppNotificationStoreSetActionResult) => void;
}
