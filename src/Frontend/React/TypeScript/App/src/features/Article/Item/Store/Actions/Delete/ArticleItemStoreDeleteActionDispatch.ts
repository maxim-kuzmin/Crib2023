import { type ArticleItemStoreDeleteActionResult } from './ArticleItemStoreDeleteActionResult';

export interface ArticleItemStoreDeleteActionDispatch {
  readonly run: (actionResult: ArticleItemStoreDeleteActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
