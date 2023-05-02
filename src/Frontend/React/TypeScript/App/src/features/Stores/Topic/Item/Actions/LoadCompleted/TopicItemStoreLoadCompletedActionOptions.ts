import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreLoadCompletedActionCallback } from './TopicItemStoreLoadCompletedActionCallback';
import { type TopicItemStoreLoadCompletedActionPayload } from './TopicItemStoreLoadCompletedActionPayload';

export interface TopicItemStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreLoadCompletedActionCallback;
  readonly payloadOfLoadCompletedAction?: TopicItemStoreLoadCompletedActionPayload;
}
