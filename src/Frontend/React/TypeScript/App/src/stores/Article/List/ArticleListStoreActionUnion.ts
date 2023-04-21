import {
  type ArticleListStoreClearAction,
  type ArticleListStoreLoadAction,
  type ArticleListStoreLoadCompletedAction,
  type ArticleListStoreSetAction
} from './Actions';

export type ArticleListStoreActionUnion =
  | ArticleListStoreClearAction
  | ArticleListStoreLoadAction
  | ArticleListStoreLoadCompletedAction
  | ArticleListStoreSetAction;
