import { type ArticleItemStoreLoadActionResult } from './ArticleItemStoreLoadActionResult';

export interface ArticleItemStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly resultOfLoadAction: ArticleItemStoreLoadActionResult;
}
