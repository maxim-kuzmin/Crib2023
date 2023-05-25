import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionDispatch {
  readonly run: (actionResult: TopicTreeStoreLoadActionResult, abortSignal?: AbortSignal) => Promise<void>;
}
