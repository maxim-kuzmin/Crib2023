import { type TopicItemStoreSaveCompletedActionResult } from './TopicItemStoreSaveCompletedActionResult';

export interface TopicItemStoreSaveCompletedActionPayload {
  actionResult: TopicItemStoreSaveCompletedActionResult;
}

export function createTopicItemStoreSaveCompletedActionPayload (
  options: Partial<TopicItemStoreSaveCompletedActionPayload>
): TopicItemStoreSaveCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
