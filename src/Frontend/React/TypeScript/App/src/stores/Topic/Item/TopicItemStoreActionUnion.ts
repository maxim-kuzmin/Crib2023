import {
  type TopicItemStoreClearAction,
  type TopicItemStoreLoadAction,
  type TopicItemStoreSetAction,
} from '../../../all';

export type TopicItemStoreActionUnion =
  | TopicItemStoreClearAction
  | TopicItemStoreLoadAction
  | TopicItemStoreSetAction;
