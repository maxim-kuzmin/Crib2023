import { type TopicTreeStoreLoadCompletedActionPayload } from '../LoadCompleted';
import { type TopicTreeStoreLoadActionDispatch } from './TopicTreeStoreLoadActionDispatch';

export interface TopicTreeStoreLoadActionOutput {
  readonly dispatchOfLoadAction: TopicTreeStoreLoadActionDispatch;
  readonly payloadOfLoadCompletedAction: TopicTreeStoreLoadCompletedActionPayload;
  readonly pendingOfLoadAction: boolean;
}
