import { type ArticleListStoreLoadCompletedActionResult } from '../LoadCompleted';
import { type ArticleListStoreLoadActionDispatch } from './ArticleListStoreLoadActionDispatch';

export interface ArticleListStoreLoadActionOutput {
  readonly dispatchOfLoadAction: ArticleListStoreLoadActionDispatch;
  readonly pendingOfLoadAction: boolean;
  readonly resultOfLoadCompletedAction: ArticleListStoreLoadCompletedActionResult;
}
