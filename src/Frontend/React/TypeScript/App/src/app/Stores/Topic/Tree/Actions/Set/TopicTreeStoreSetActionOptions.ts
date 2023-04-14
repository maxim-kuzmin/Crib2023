import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreSetActionCallback } from './TopicTreeStoreSetActionCallback';
import { type TopicTreeStoreSetActionPayload } from './TopicTreeStoreSetActionPayload';

export interface TopicTreeStoreSetActionOptions extends StoreActionOptions {
  callback?: TopicTreeStoreSetActionCallback;
  payload?: TopicTreeStoreSetActionPayload;
}
