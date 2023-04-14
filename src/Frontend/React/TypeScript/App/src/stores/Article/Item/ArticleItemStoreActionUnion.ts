import {
  type ArticleItemStoreClearAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreSetAction
} from './Actions';

export type ArticleItemStoreActionUnion =
  | ArticleItemStoreClearAction
  | ArticleItemStoreLoadAction
  | ArticleItemStoreSetAction;
