import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from '../Set';
import { type TopicItemStoreLoadActionResult } from './TopicItemStoreLoadActionResult';

export interface TopicItemStoreLoadActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly resultOfLoadAction?: TopicItemStoreLoadActionResult;
}
