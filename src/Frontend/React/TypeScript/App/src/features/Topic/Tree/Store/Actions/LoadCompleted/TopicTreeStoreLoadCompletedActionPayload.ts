import { type TopicTreeStoreLoadCompletedActionResult } from './TopicTreeStoreLoadCompletedActionResult';

export interface TopicTreeStoreLoadCompletedActionPayload {
  actionResult: TopicTreeStoreLoadCompletedActionResult;
}

export function createTopicTreeStoreLoadCompletedActionPayload (
  options: Partial<TopicTreeStoreLoadCompletedActionPayload>
): TopicTreeStoreLoadCompletedActionPayload {
  return {
    actionResult: options?.actionResult ?? null,
  };
}
