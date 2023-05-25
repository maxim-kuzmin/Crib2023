import { type ArticleListStoreLoadCompletedActionResult } from './ArticleListStoreLoadCompletedActionResult';

export interface ArticleListStoreLoadCompletedActionDispatch {
  readonly run: (actionResult: ArticleListStoreLoadCompletedActionResult) => void;
}
