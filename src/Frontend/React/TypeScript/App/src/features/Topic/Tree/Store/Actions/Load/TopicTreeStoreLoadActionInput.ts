import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly resultOfLoadAction: TopicTreeStoreLoadActionResult;
}
