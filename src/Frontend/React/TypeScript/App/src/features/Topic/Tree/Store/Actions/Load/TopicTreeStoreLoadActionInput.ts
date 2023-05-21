import { type TopicTreeStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: TopicTreeStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: TopicTreeStoreLoadActionPayload;
}
