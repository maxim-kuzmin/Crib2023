import { type TopicItemStoreLoadCompletedActionResult } from '../LoadCompleted';
import { type TopicItemStoreLoadActionDispatch } from './TopicItemStoreLoadActionDispatch';

export interface TopicItemStoreLoadActionOutput {
  readonly dispatchOfLoadAction: TopicItemStoreLoadActionDispatch;
  readonly pendingOfLoadAction: boolean;
  readonly resultOfLoadCompletedAction: TopicItemStoreLoadCompletedActionResult;
}
