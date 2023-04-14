import { type TopicTreeStoreLoadActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadAction extends StoreAction {
  type: TopicTreeStoreActionType.Load;
  payload: TopicTreeStoreLoadActionPayload;
}
