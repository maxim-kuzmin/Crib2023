import { type ArticleItemStoreDeleteCompletedActionResult } from '../DeleteCompleted';
import { type ArticleItemStoreDeleteActionDispatch } from './ArticleItemStoreDeleteActionDispatch';

export interface ArticleItemStoreDeleteActionOutput {
  readonly dispatchOfDeleteAction: ArticleItemStoreDeleteActionDispatch;
  readonly pendingOfDeleteAction: boolean;
  readonly resultOfDeleteCompletedAction: ArticleItemStoreDeleteCompletedActionResult;
}
