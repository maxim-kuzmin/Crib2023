import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreDeleteCompletedActionCallback } from './TopicItemStoreDeleteCompletedActionCallback';
import { type TopicItemStoreDeleteCompletedActionPayload } from './TopicItemStoreDeleteCompletedActionPayload';

export interface TopicItemStoreDeleteCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly payloadOfDeleteCompletedAction?: TopicItemStoreDeleteCompletedActionPayload;
}
