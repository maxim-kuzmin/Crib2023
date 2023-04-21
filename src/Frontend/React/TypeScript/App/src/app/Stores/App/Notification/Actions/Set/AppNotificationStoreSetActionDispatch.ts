import { type AppNotificationStoreSetActionPayload } from './AppNotificationStoreSetActionPayload';

export interface AppNotificationStoreSetActionDispatch {
  readonly run: (payload: AppNotificationStoreSetActionPayload) => void;
}
