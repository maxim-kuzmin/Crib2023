import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionDispatch {
  readonly run: (actionResult: TopicItemStoreLoadActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
