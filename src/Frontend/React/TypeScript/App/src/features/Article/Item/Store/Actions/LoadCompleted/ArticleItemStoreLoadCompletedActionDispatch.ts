import { type ArticleItemStoreLoadCompletedActionResult } from './ArticleItemStoreLoadCompletedActionResult';

export interface ArticleItemStoreLoadCompletedActionDispatch {
  readonly run: (actionResult: ArticleItemStoreLoadCompletedActionResult) => void;
}
