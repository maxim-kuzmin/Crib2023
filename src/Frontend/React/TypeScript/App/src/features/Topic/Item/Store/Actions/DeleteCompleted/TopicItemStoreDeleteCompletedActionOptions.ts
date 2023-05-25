import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreDeleteCompletedActionCallback } from './TopicItemStoreDeleteCompletedActionCallback';
import { type TopicItemStoreDeleteCompletedActionResult } from './TopicItemStoreDeleteCompletedActionResult';

export interface TopicItemStoreDeleteCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly resultOfDeleteCompletedAction?: TopicItemStoreDeleteCompletedActionResult;
}
