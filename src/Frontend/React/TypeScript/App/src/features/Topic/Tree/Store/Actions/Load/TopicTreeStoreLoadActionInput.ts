import { type TopicTreeStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: TopicTreeStoreLoadCompletedActionCallback;
  readonly resultOfLoadAction: TopicTreeStoreLoadActionResult;
}
