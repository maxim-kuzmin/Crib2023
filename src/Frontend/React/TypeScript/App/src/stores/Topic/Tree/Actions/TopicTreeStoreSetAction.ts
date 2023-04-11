import {
  type TopicTreeStoreActionType,
  type TopicTreeStoreSetActionPayload
} from '../../../../all';

export interface TopicTreeStoreSetAction {
  type: TopicTreeStoreActionType.Set;
  payload: TopicTreeStoreSetActionPayload;
}
