import { type TopicTreeStoreLoadCompletedActionResult } from '../LoadCompleted';
import { type TopicTreeStoreLoadActionDispatch } from './TopicTreeStoreLoadActionDispatch';

export interface TopicTreeStoreLoadActionOutput {
  readonly dispatchOfLoadAction: TopicTreeStoreLoadActionDispatch;
  readonly pendingOfLoadAction: boolean;
  readonly resultOfLoadCompletedAction: TopicTreeStoreLoadCompletedActionResult;
}
