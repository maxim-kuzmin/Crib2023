import { type TopicTreeStoreLoadActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadAction extends StoreAction {
  type: TopicTreeStoreActionType.Load;
  payload: TopicTreeStoreLoadActionPayload;
}
