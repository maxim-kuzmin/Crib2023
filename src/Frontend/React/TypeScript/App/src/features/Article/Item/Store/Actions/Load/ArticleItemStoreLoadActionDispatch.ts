import { type ArticleItemStoreLoadActionResult } from './ArticleItemStoreLoadActionResult';

export interface ArticleItemStoreLoadActionDispatch {
  readonly run: (actionResult: ArticleItemStoreLoadActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
