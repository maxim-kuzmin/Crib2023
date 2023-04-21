import { type TopicItemStoreLoadCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.LoadCompleted;
  payload: TopicItemStoreLoadCompletedActionPayload;
}
