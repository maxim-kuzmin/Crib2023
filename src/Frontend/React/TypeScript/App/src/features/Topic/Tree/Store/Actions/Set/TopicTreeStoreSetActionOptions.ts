import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreSetActionCallback } from './TopicTreeStoreSetActionCallback';
import { type TopicTreeStoreSetActionResult } from './TopicTreeStoreSetActionResult';

export interface TopicTreeStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly resultOfSetAction?: TopicTreeStoreSetActionResult;
}
