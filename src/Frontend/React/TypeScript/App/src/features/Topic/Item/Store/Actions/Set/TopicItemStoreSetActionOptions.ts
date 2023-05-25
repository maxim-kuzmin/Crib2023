import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from './TopicItemStoreSetActionCallback';
import { type TopicItemStoreSetActionResult } from './TopicItemStoreSetActionResult';

export interface TopicItemStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly resultOfSetAction?: TopicItemStoreSetActionResult;
}
