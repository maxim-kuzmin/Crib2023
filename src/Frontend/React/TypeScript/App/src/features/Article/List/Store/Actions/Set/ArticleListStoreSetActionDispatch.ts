import { type ArticleListStoreSetActionResult } from './ArticleListStoreSetActionResult';

export interface ArticleListStoreSetActionDispatch {
  readonly run: (actionResult: ArticleListStoreSetActionResult) => void;
}
