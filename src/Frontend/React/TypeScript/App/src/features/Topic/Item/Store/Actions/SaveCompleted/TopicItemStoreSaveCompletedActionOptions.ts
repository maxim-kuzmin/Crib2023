import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreSaveCompletedActionCallback } from './TopicItemStoreSaveCompletedActionCallback';
import { type TopicItemStoreSaveCompletedActionResult } from './TopicItemStoreSaveCompletedActionResult';

export interface TopicItemStoreSaveCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicItemStoreSaveCompletedActionCallback;
  readonly resultOfSaveCompletedAction?: TopicItemStoreSaveCompletedActionResult;
}
