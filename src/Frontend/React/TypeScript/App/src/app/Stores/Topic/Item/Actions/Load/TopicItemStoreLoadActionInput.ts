import { type TopicItemStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: TopicItemStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: TopicItemStoreLoadActionPayload;
}
