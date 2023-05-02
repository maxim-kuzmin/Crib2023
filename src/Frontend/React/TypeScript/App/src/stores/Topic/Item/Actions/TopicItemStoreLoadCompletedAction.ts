import { type StoreAction } from '../../../../common';
import { type TopicItemStoreLoadCompletedActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadCompletedAction extends StoreAction {
  type: TopicItemStoreActionType.LoadCompleted;
  payload: TopicItemStoreLoadCompletedActionPayload;
}
