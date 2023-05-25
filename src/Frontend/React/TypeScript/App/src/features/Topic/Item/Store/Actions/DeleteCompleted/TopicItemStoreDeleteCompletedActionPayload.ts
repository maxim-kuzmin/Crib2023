import { type TopicItemStoreDeleteCompletedActionResult } from './TopicItemStoreDeleteCompletedActionResult';

export interface TopicItemStoreDeleteCompletedActionPayload {
  actionResult: TopicItemStoreDeleteCompletedActionResult;
}

export function createTopicItemStoreDeleteCompletedActionPayload (
  options: Partial<TopicItemStoreDeleteCompletedActionPayload>
): TopicItemStoreDeleteCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
