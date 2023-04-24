import { type TopicItemStoreSaveCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.SaveCompleted;
  payload: TopicItemStoreSaveCompletedActionPayload;
}
