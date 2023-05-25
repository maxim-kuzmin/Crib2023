import { type TopicItemStoreSetActionResult } from './TopicItemStoreSetActionResult';

export interface TopicItemStoreSetActionPayload {
  actionResult: TopicItemStoreSetActionResult;
}

export function createTopicItemStoreSetActionPayload (
  options: Partial<TopicItemStoreSetActionPayload>
): TopicItemStoreSetActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
