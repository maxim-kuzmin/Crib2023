import { type TopicTreeStoreLoadCompletedActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadCompletedAction extends StoreAction {
  type: TopicTreeStoreActionType.LoadCompleted;
  payload: TopicTreeStoreLoadCompletedActionPayload;
}
