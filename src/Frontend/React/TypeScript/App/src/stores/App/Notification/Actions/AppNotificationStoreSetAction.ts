import { type AppNotificationStoreSetActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type AppNotificationStoreActionType } from '../AppNotificationStoreActionType';

export interface AppNotificationStoreSetAction extends StoreAction {
  type: AppNotificationStoreActionType.Set;
  payload: AppNotificationStoreSetActionPayload;
}
