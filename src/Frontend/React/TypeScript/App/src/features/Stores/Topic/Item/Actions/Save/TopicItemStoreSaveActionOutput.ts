import { type TopicItemStoreSaveCompletedActionPayload } from '../SaveCompleted';
import { type TopicItemStoreSaveActionDispatch } from './TopicItemStoreSaveActionDispatch';

export interface TopicItemStoreSaveActionOutput {
  readonly dispatchOfSaveAction: TopicItemStoreSaveActionDispatch;
  readonly payloadOfSaveCompletedAction: TopicItemStoreSaveCompletedActionPayload;
  readonly pendingOfSaveAction: boolean;
}
