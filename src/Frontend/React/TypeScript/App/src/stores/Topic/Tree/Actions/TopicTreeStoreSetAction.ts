import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreSetActionPayload } from '../../../../features';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreSetAction extends StoreAction {
  type: TopicTreeStoreActionType.Set;
  payload: TopicTreeStoreSetActionPayload;
}
