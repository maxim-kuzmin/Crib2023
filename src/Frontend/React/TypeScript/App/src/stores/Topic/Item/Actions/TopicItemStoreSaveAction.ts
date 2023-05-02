import { type StoreAction } from '../../../../common';
import { type TopicItemStoreSaveActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveAction extends StoreAction {
  type: TopicItemStoreActionType.Save;
  payload: TopicItemStoreSaveActionPayload;
}
