import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreDeleteCompletedActionCallback } from '../DeleteCompleted';
import { type TopicItemStoreDeleteActionPayload } from './TopicItemStoreDeleteActionPayload';

export interface TopicItemStoreDeleteActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreDeleteCompletedActionCallback;
  readonly payloadOfDeleteAction?: TopicItemStoreDeleteActionPayload;
}
