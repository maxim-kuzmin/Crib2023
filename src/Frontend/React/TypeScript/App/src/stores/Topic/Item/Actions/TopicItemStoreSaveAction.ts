import { type TopicItemStoreSaveActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveAction extends StoreAction {
  type: TopicItemStoreActionType.Save;
  payload: TopicItemStoreSaveActionPayload;
}
