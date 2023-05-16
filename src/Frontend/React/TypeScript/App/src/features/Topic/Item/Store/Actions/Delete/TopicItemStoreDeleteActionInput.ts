import { type TopicItemStoreDeleteCompletedActionCallback } from '../DeleteCompleted';

export interface TopicItemStoreDeleteActionInput {
  readonly onActionCompleted?: TopicItemStoreDeleteCompletedActionCallback;
}
