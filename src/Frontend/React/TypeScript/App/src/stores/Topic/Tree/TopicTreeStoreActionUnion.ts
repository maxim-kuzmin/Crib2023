import {
  type TopicTreeStoreClearAction,
  type TopicTreeStoreLoadAction,
  type TopicTreeStoreSetAction,
} from '../../../all';

export type TopicTreeStoreActionUnion =
  | TopicTreeStoreClearAction
  | TopicTreeStoreLoadAction
  | TopicTreeStoreSetAction;
