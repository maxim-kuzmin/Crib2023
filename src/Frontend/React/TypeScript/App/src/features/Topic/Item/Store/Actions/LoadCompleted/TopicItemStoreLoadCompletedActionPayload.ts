import { type TopicItemStoreLoadCompletedActionResult } from './TopicItemStoreLoadCompletedActionResult';

export interface TopicItemStoreLoadCompletedActionPayload {
  actionResult: TopicItemStoreLoadCompletedActionResult;
}

export function createTopicItemStoreLoadCompletedActionPayload (
  options: Partial<TopicItemStoreLoadCompletedActionPayload>
): TopicItemStoreLoadCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
