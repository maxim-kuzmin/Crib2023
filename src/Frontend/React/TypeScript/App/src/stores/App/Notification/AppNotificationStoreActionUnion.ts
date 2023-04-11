import {
  type AppNotificationStoreClearAction,
  type AppNotificationStoreSetAction,
} from '../../../all';

export type AppNotificationStoreActionUnion =
  | AppNotificationStoreClearAction
  | AppNotificationStoreSetAction;
