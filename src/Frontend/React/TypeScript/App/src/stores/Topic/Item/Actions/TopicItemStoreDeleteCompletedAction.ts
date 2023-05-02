import { type StoreAction } from '../../../../common';
import { type TopicItemStoreDeleteCompletedActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.DeleteCompleted;
  payload: TopicItemStoreDeleteCompletedActionPayload;
}
