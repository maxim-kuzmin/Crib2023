import { type TopicItemStoreLoadCompletedActionPayload } from '../LoadCompleted';
import { type TopicItemStoreLoadActionDispatch } from './TopicItemStoreLoadActionDispatch';

export interface TopicItemStoreLoadActionOutput {
  readonly dispatchOfLoadAction: TopicItemStoreLoadActionDispatch;
  readonly payloadOfLoadCompletedAction: TopicItemStoreLoadCompletedActionPayload;
  readonly pendingOfLoadAction: boolean;
}
