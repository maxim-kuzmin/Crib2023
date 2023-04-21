import { type TopicItemStoreDeleteCompletedActionPayload } from '../DeleteCompleted';
import { type TopicItemStoreDeleteActionDispatch } from './TopicItemStoreDeleteActionDispatch';

export interface TopicItemStoreDeleteActionOutput {
  readonly dispatchOfDeleteAction: TopicItemStoreDeleteActionDispatch;
  readonly payloadOfDeleteCompletedAction: TopicItemStoreDeleteCompletedActionPayload;
  readonly pendingOfDeleteAction: boolean;
}
