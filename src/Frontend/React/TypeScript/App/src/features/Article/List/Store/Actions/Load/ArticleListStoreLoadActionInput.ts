import { type ArticleListStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: ArticleListStoreLoadCompletedActionCallback;
  readonly resultOfLoadAction: ArticleListStoreLoadActionResult;
}
