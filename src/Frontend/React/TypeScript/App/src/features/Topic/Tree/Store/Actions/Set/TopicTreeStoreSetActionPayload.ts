import { type TopicTreeStoreSetActionResult } from './TopicTreeStoreSetActionResult';

export interface TopicTreeStoreSetActionPayload {
  actionResult: TopicTreeStoreSetActionResult;
}

export function createTopicTreeStoreSetActionPayload (
  options: Partial<TopicTreeStoreSetActionPayload>
): TopicTreeStoreSetActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
