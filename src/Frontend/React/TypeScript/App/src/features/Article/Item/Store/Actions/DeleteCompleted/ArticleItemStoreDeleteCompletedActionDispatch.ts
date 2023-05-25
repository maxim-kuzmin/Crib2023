import { type ArticleItemStoreDeleteCompletedActionResult } from './ArticleItemStoreDeleteCompletedActionResult';

export interface ArticleItemStoreDeleteCompletedActionDispatch {
  run: (actionResult: ArticleItemStoreDeleteCompletedActionResult) => void;
}
