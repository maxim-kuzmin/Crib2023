import { type TopicItemStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: TopicItemStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: TopicItemStoreLoadActionPayload;
}
