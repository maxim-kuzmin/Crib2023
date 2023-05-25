import { type TopicItemStoreSaveCompletedActionResult } from './TopicItemStoreSaveCompletedActionResult';

export interface TopicItemStoreSaveCompletedActionDispatch {
  readonly run: (actionResult: TopicItemStoreSaveCompletedActionResult) => void;
}
