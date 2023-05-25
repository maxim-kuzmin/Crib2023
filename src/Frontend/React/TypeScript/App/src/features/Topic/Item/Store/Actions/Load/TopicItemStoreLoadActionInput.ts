import { type TopicItemStoreLoadCompletedActionCallback } from '../LoadCompleted';
import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionInput {
  readonly abortController?: AbortController;
  readonly onActionCompleted?: TopicItemStoreLoadCompletedActionCallback;
  readonly resultOfLoadAction: TopicItemStoreLoadActionResult;
}
