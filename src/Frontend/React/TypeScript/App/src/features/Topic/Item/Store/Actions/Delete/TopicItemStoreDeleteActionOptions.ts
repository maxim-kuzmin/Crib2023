import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreDeleteCompletedActionCallback } from '../DeleteCompleted';
import { type TopicItemStoreDeleteActionResult } from './TopicItemStoreDeleteActionResult';

export interface TopicItemStoreDeleteActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly resultOfDeleteAction?: TopicItemStoreDeleteActionResult;
}
