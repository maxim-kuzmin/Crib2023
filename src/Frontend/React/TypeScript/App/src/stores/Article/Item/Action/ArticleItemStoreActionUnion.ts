import {
  type ArticleItemStoreClearAction,
  type ArticleItemStoreLoadAction,
  type ArticleItemStoreSetAction,
} from '../../../../all';

export type ArticleItemStoreActionUnion =
  | ArticleItemStoreClearAction
  | ArticleItemStoreLoadAction
  | ArticleItemStoreSetAction;
