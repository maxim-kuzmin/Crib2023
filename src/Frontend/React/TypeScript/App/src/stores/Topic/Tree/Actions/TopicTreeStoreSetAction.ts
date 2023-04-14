import { type TopicTreeStoreSetActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreSetAction extends StoreAction {
  type: TopicTreeStoreActionType.Set;
  payload: TopicTreeStoreSetActionPayload;
}
