import { type ArticleItemStoreSaveActionResult } from './ArticleItemStoreSaveActionResult';

export interface ArticleItemStoreSaveActionDispatch {
  readonly run: (actionResult: ArticleItemStoreSaveActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
