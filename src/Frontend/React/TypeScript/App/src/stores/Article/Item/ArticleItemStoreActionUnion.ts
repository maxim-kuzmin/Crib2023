import {
  type ArticleItemStoreClearAction,
  type ArticleItemStoreDeleteAction,
  type ArticleItemStoreDeleteCompletedAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreSaveAction,
  type ArticleItemStoreSetAction
} from './Actions';

export type ArticleItemStoreActionUnion =
  | ArticleItemStoreClearAction
  | ArticleItemStoreDeleteAction
  | ArticleItemStoreDeleteCompletedAction
  | ArticleItemStoreLoadAction
  | ArticleItemStoreSaveAction
  | ArticleItemStoreSetAction;
