import {
  type ArticleListStoreClearAction,
  type ArticleListStoreLoadAction,
  type ArticleListStoreSetAction
} from './Actions';

export type ArticleListStoreActionUnion =
  | ArticleListStoreClearAction
  | ArticleListStoreLoadAction
  | ArticleListStoreSetAction;
