import { type ArticleItemStoreSaveCompletedActionResult } from '../SaveCompleted';
import { type ArticleItemStoreSaveActionDispatch } from './ArticleItemStoreSaveActionDispatch';

export interface ArticleItemStoreSaveActionOutput {
  readonly dispatchOfSaveAction: ArticleItemStoreSaveActionDispatch;
  readonly pendingOfSaveAction: boolean;
  readonly resultOfSaveCompletedAction: ArticleItemStoreSaveCompletedActionResult;
}
