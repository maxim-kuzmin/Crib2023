import { type TopicItemStoreDeleteCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.DeleteCompleted;
  payload: TopicItemStoreDeleteCompletedActionPayload;
}
