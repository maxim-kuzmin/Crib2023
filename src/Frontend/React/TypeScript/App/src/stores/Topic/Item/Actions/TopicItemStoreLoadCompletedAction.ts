import { type TopicItemStoreLoadCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.LoadCompleted;
  payload: TopicItemStoreLoadCompletedActionPayload;
}
