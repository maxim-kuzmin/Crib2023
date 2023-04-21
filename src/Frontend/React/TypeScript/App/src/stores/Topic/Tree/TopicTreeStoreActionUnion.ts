import {
  type TopicTreeStoreClearAction,
  type TopicTreeStoreLoadAction,
  type TopicTreeStoreLoadCompletedAction,
  type TopicTreeStoreSetAction
} from './Actions';

export type TopicTreeStoreActionUnion =
  | TopicTreeStoreClearAction
  | TopicTreeStoreLoadAction
  | TopicTreeStoreLoadCompletedAction
  | TopicTreeStoreSetAction;
