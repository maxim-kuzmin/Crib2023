import {
  type StoreAction,
  type TopicTreeStoreActionType,
  type TopicTreeStoreSetActionPayload
} from '../../../../all';

export interface TopicTreeStoreSetAction extends StoreAction {
  type: TopicTreeStoreActionType.Set;
  payload: TopicTreeStoreSetActionPayload;
}
