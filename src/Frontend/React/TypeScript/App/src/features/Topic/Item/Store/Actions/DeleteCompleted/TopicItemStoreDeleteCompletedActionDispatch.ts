import { type TopicItemStoreDeleteCompletedActionResult } from './TopicItemStoreDeleteCompletedActionResult';

export interface TopicItemStoreDeleteCompletedActionDispatch {
  run: (actionResult: TopicItemStoreDeleteCompletedActionResult) => void;
}
