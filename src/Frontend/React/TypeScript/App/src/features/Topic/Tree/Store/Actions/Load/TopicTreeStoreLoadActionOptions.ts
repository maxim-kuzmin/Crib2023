import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreSetActionCallback } from '../Set';
import { type TopicTreeStoreLoadActionResult } from './TopicTreeStoreLoadActionResult';

export interface TopicTreeStoreLoadActionOptions extends StoreActionOptions {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly resultOfLoadAction?: TopicTreeStoreLoadActionResult;
}
