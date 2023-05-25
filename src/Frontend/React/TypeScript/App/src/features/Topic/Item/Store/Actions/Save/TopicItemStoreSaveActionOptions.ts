import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSetActionCallback } from '../Set';
import { type TopicItemStoreSaveActionResult } from './TopicItemStoreSaveActionResult';

export interface TopicItemStoreSaveActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSetActionCallback;
  readonly resultOfSaveAction?: TopicItemStoreSaveActionResult;
}
