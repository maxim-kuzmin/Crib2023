import { type TopicItemStoreDeleteCompletedActionResult } from '../DeleteCompleted';
import { type TopicItemStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatch';

export interface TopicItemStoreDeleteActionOutput {
  readonly dispatchOfDeleteAction: TopicItemStoreDeleteActionDispatch;
  readonly pendingOfDeleteAction: boolean;
  readonly resultOfDeleteCompletedAction: TopicItemStoreDeleteCompletedActionResult;
}
