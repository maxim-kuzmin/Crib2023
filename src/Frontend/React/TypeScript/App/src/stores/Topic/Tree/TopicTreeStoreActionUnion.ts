import {
  type TopicTreeStoreClearAction,
  type TopicTreeStoreLoadAction,
  type TopicTreeStoreSetAction
} from './Actions';

export type TopicTreeStoreActionUnion =
  | TopicTreeStoreClearAction
  | TopicTreeStoreLoadAction
  | TopicTreeStoreSetAction;
