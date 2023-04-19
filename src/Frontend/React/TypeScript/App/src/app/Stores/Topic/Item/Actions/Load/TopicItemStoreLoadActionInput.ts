import { type TopicItemStoreSetActionPayload } from '../Set';

export interface TopicItemStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: (payload: TopicItemStoreSetActionPayload) => void;
  readonly topicId: number;
}
