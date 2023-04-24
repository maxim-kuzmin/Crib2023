import { type TopicTreeStoreLoadCompletedActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadCompletedAction extends StoreAction {
  type: TopicTreeStoreActionType.LoadCompleted;
  payload: TopicTreeStoreLoadCompletedActionPayload;
}
