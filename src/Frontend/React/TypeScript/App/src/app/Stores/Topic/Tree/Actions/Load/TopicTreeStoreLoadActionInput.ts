import { type TopicTreeStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionInput {
  readonly isCanceled?: boolean;
  readonly onActionCompleted?: TopicTreeStoreLoadCompletedActionCallback;
  readonly payloadOfLoadAction: TopicTreeStoreLoadActionPayload;
}
