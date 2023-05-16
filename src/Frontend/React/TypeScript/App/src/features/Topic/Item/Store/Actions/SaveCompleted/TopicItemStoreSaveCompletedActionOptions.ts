import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSaveCompletedActionCallback } from './TopicItemStoreSaveCompletedActionCallback';
import { type TopicItemStoreSaveCompletedActionPayload } from './TopicItemStoreSaveCompletedActionPayload';

export interface TopicItemStoreSaveCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSaveCompletedActionCallback;
  readonly payloadOfSaveCompletedAction?: TopicItemStoreSaveCompletedActionPayload;
}
