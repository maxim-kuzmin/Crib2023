import { type AppNotificationStoreSetActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type AppNotificationStoreActionType } from '../AppNotificationStoreActionType';

export interface AppNotificationStoreSetAction extends StoreAction {
  type: AppNotificationStoreActionType.Set;
  payload: AppNotificationStoreSetActionPayload;
}
