import { type TopicTreeStoreLoadCompletedActionResult } from './TopicTreeStoreLoadCompletedActionResult';

export interface TopicTreeStoreLoadCompletedActionDispatch {
  readonly run: (actionResult: TopicTreeStoreLoadCompletedActionResult) => void;
}
