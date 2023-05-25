import { type TopicItemStoreSaveCompletedActionResult } from '../SaveCompleted';
import { type TopicItemStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatch';

export interface TopicItemStoreSaveActionOutput {
  readonly dispatchOfSaveAction: TopicItemStoreSaveActionDispatch;
  readonly pendingOfSaveAction: boolean;
  readonly resultOfSaveCompletedAction: TopicItemStoreSaveCompletedActionResult;
}
