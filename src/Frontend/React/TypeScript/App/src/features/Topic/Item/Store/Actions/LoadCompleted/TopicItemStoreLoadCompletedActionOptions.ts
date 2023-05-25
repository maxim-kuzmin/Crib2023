import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreLoadCompletedActionCallback } from './TopicItemStoreLoadCompletedActionCallback';
import { type TopicItemStoreLoadCompletedActionResult } from './TopicItemStoreLoadCompletedActionResult';

export interface TopicItemStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreLoadCompletedActionCallback;
  readonly resultOfLoadCompletedAction?: TopicItemStoreLoadCompletedActionResult;
}
