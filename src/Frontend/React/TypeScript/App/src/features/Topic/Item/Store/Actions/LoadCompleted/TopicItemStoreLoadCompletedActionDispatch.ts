import { type TopicItemStoreLoadCompletedActionResult } from './TopicItemStoreLoadCompletedActionResult';

export interface TopicItemStoreLoadCompletedActionDispatch {
  readonly run: (actionResult: TopicItemStoreLoadCompletedActionResult) => void;
}
