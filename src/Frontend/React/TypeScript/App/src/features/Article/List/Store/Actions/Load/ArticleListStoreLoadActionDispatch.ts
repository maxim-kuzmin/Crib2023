import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionDispatch {
  readonly run: (actionResult: ArticleListStoreLoadActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
