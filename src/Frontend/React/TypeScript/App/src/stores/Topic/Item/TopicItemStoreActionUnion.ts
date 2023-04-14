import {
  type TopicItemStoreClearAction,
  type TopicItemStoreLoadAction,
  type TopicItemStoreSetAction
} from './Actions';

export type TopicItemStoreActionUnion =
  | TopicItemStoreClearAction
  | TopicItemStoreLoadAction
  | TopicItemStoreSetAction;
