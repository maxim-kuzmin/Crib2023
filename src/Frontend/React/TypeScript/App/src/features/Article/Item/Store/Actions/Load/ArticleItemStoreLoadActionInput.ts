import { type ArticleItemStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type ArticleItemStoreLoadActionResult } from './ArticleItemStoreLoadActionResult';

export interface ArticleItemStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: ArticleItemStoreLoadCompletedActionCallback;
  readonly resultOfLoadAction: ArticleItemStoreLoadActionResult;
}
