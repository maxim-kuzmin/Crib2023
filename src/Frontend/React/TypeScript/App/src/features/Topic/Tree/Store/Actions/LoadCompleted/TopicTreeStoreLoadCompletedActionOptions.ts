import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreLoadCompletedActionCallback } from './TopicTreeStoreLoadCompletedActionCallback';
import { type TopicTreeStoreLoadCompletedActionResult } from './TopicTreeStoreLoadCompletedActionResult';

export interface TopicTreeStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicTreeStoreLoadCompletedActionCallback;
  readonly resultOfLoadCompletedAction?: TopicTreeStoreLoadCompletedActionResult;
}
