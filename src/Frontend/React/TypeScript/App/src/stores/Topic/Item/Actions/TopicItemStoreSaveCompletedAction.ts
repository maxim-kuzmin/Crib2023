import { type TopicItemStoreSaveCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.SaveCompleted;
  payload: TopicItemStoreSaveCompletedActionPayload;
}
