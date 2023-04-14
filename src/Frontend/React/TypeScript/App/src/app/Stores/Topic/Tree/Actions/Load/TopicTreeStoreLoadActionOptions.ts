import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreSetActionCallback } from '../Set';
import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionOptions extends StoreActionOptions {
  callback?: TopicTreeStoreSetActionCallback;
  payload: TopicTreeStoreLoadActionPayload;
}
