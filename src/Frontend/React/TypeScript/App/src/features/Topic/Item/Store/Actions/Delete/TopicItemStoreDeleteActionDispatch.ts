import { type TopicItemStoreDeleteActionResult } from './TopicItemStoreDeleteActionResult';

export interface TopicItemStoreDeleteActionDispatch {
  readonly run: (actionResult: TopicItemStoreDeleteActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
