import { type AppNotificationStoreClearAction, type AppNotificationStoreSetAction } from './Actions';

export type AppNotificationStoreActionUnion =
  | AppNotificationStoreClearAction
  | AppNotificationStoreSetAction;
