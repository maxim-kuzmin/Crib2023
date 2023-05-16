import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from '../Set';
import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly payloadOfLoadAction?: TopicItemStoreLoadActionPayload;
}
