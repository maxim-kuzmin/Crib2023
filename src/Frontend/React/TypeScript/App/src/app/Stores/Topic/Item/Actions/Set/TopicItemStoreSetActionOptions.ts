import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from './TopicItemStoreSetActionCallback';
import { type TopicItemStoreSetActionPayload } from './TopicItemStoreSetActionPayload';

export interface TopicItemStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly payloadOfSetAction?: TopicItemStoreSetActionPayload;
}
