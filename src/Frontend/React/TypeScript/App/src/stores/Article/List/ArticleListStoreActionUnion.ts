import {
  type ArticleListStoreClearAction,
  type ArticleListStoreLoadAction,
  type ArticleListStoreSetAction,
} from '../../../all';

export type ArticleListStoreActionUnion =
  | ArticleListStoreClearAction
  | ArticleListStoreLoadAction
  | ArticleListStoreSetAction;
