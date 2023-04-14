import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from './TopicItemStoreSetActionCallback';
import { type TopicItemStoreSetActionPayload } from './TopicItemStoreSetActionPayload';

export interface TopicItemStoreSetActionOptions extends StoreActionOptions {
  callback?: TopicItemStoreSetActionCallback;
  payload?: TopicItemStoreSetActionPayload;
}
