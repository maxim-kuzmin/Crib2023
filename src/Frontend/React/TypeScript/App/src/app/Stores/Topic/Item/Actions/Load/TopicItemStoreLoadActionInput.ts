import { type TopicItemStoreSetActionPayload } from '../Set';

export interface TopicItemStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onTopicItemLoaded?: (payload: TopicItemStoreSetActionPayload) => void;
  readonly topicId: number;
}
