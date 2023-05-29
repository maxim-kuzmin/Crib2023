import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly resultOfLoadAction: TopicItemStoreLoadActionResult;
}
