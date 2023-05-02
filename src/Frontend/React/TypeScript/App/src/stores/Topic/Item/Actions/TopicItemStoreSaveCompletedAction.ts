import { type StoreAction } from '../../../../common';
import { type TopicItemStoreSaveCompletedActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.SaveCompleted;
  payload: TopicItemStoreSaveCompletedActionPayload;
}
