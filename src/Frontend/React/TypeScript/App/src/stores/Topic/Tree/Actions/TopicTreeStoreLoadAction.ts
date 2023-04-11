import {
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreActionType
} from '../../../../all';

export interface TopicTreeStoreLoadAction {
  type: TopicTreeStoreActionType.Load;
  payload: TopicTreeStoreLoadActionPayload;
}
