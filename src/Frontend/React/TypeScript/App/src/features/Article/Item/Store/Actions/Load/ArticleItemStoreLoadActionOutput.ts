import { type ArticleItemStoreLoadCompletedActionResult } from '../LoadCompleted';
import { type ArticleItemStoreLoadActionDispatch } from './ArticleItemStoreLoadActionDispatch';

export interface ArticleItemStoreLoadActionOutput {
  readonly dispatchOfLoadAction: ArticleItemStoreLoadActionDispatch;
  readonly pendingOfLoadAction: boolean;
  readonly resultOfLoadCompletedAction: ArticleItemStoreLoadCompletedActionResult;
}
