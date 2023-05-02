import { type StoreAction } from '../../../../common';
import { type AppNotificationStoreSetActionPayload } from '../../../../features';
import { type AppNotificationStoreActionType } from '../AppNotificationStoreActionType';

export interface AppNotificationStoreSetAction extends StoreAction {
  type: AppNotificationStoreActionType.Set;
  payload: AppNotificationStoreSetActionPayload;
}
