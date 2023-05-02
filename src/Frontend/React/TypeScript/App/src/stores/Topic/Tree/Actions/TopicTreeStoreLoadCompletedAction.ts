import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreLoadCompletedActionPayload } from '../../../../features';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadCompletedAction extends StoreAction {
  type: TopicTreeStoreActionType.LoadCompleted;
  payload: TopicTreeStoreLoadCompletedActionPayload;
}
