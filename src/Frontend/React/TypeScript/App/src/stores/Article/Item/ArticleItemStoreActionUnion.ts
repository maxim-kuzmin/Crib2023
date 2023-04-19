import {
  type ArticleItemStoreClearAction,
  type ArticleItemStoreDeleteAction,
  type ArticleItemStoreDeleteCompletedAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreLoadCompletedAction,
  type ArticleItemStoreSaveAction,
  type ArticleItemStoreSaveCompletedAction,
  type ArticleItemStoreSetAction
} from './Actions';

export type ArticleItemStoreActionUnion =
  | ArticleItemStoreClearAction
  | ArticleItemStoreDeleteAction
  | ArticleItemStoreDeleteCompletedAction
  | ArticleItemStoreLoadAction
  | ArticleItemStoreLoadCompletedAction
  | ArticleItemStoreSaveAction
  | ArticleItemStoreSaveCompletedAction
  | ArticleItemStoreSetAction;
