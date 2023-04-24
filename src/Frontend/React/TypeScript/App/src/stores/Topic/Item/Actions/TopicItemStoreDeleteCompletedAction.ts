import { type TopicItemStoreDeleteCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.DeleteCompleted;
  payload: TopicItemStoreDeleteCompletedActionPayload;
}
