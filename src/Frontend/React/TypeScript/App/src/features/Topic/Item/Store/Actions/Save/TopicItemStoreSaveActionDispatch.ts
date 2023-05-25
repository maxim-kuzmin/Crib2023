import { type TopicItemStoreSaveActionResult } from './TopicItemStoreSaveActionResult';

export interface TopicItemStoreSaveActionDispatch {
  readonly run: (actionResult: TopicItemStoreSaveActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
