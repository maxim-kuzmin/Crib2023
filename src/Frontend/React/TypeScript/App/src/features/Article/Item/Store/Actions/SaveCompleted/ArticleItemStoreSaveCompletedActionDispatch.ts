import { type ArticleItemStoreSaveCompletedActionResult } from './ArticleItemStoreSaveCompletedActionResult';

export interface ArticleItemStoreSaveCompletedActionDispatch {
  readonly run: (actionResult: ArticleItemStoreSaveCompletedActionResult) => void;
}
