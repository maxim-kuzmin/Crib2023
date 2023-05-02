import { type TopicItemStoreSaveCompletedActionCallback } from '../SaveCompleted';

export interface TopicItemStoreSaveActionInput {
  readonly onActionCompleted?: TopicItemStoreSaveCompletedActionCallback;
}
