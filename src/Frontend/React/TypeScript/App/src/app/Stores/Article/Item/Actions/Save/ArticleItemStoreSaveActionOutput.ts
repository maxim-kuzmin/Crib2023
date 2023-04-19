import { type ArticleItemStoreSaveCompletedActionPayload } from '../SaveCompleted';
import { type ArticleItemStoreSaveActionDispatch } from './ArticleItemStoreSaveActionDispatch';

export interface ArticleItemStoreSaveActionOutput {
  readonly dispatchOfSaveAction: ArticleItemStoreSaveActionDispatch;
  readonly payloadOfSaveCompletedAction: ArticleItemStoreSaveCompletedActionPayload;
  readonly pendingOfSaveAction: boolean;
}
