import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreSetActionCallback } from './TopicTreeStoreSetActionCallback';
import { type TopicTreeStoreSetActionPayload } from './TopicTreeStoreSetActionPayload';

export interface TopicTreeStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: TopicTreeStoreSetActionCallback;
  readonly payloadOfSetAction?: TopicTreeStoreSetActionPayload;
}
