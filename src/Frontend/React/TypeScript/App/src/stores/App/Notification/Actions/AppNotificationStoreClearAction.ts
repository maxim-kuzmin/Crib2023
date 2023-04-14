import { type StoreAction } from '../../../../common';
import { type AppNotificationStoreActionType } from '../AppNotificationStoreActionType';

export interface AppNotificationStoreClearAction extends StoreAction {
  type: AppNotificationStoreActionType.Clear;
}
