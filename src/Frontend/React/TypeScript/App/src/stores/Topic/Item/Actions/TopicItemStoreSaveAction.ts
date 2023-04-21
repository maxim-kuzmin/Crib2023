import { type TopicItemStoreSaveActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveAction extends StoreAction {
  type: TopicItemStoreActionType.Save;
  payload: TopicItemStoreSaveActionPayload;
}
