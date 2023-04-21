import {
  type TopicItemStoreClearAction,
  type TopicItemStoreDeleteAction,
  type TopicItemStoreDeleteCompletedAction,
  type TopicItemStoreLoadAction,
  type TopicItemStoreLoadCompletedAction,
  type TopicItemStoreSaveAction,
  type TopicItemStoreSaveCompletedAction,
  type TopicItemStoreSetAction
} from './Actions';

export type TopicItemStoreActionUnion =
  | TopicItemStoreClearAction
  | TopicItemStoreDeleteAction
  | TopicItemStoreDeleteCompletedAction
  | TopicItemStoreLoadAction
  | TopicItemStoreLoadCompletedAction
  | TopicItemStoreSaveAction
  | TopicItemStoreSaveCompletedAction
  | TopicItemStoreSetAction;
