import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from '../Set';
import { type TopicItemStoreSaveActionPayload } from './TopicItemStoreSaveActionPayload';

export interface TopicItemStoreSaveActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly payloadOfSaveAction?: TopicItemStoreSaveActionPayload;
}
