import { type TopicTreeStoreSetActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreSetAction extends StoreAction {
  type: TopicTreeStoreActionType.Set;
  payload: TopicTreeStoreSetActionPayload;
}
