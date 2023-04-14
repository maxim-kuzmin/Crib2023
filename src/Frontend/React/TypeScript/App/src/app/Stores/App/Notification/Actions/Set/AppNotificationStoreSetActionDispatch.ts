import { type AppNotificationStoreSetActionPayload } from './AppNotificationStoreSetActionPayload';

export interface AppNotificationStoreSetActionDispatch {
  run: (payload: AppNotificationStoreSetActionPayload) => void;
}
