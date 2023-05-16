import { type AppNotificationStoreSetActionCallback } from './AppNotificationStoreSetActionCallback';

export interface AppNotificationStoreSetActionInput {
  readonly onActionCompleted?: AppNotificationStoreSetActionCallback;
}
