import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly resultOfLoadAction: ArticleListStoreLoadActionResult;
}
