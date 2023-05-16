import { type TopicItemStoreSaveCompletedActionPayload } from './TopicItemStoreSaveCompletedActionPayload';

export interface TopicItemStoreSaveCompletedActionDispatch {
  readonly run: (payload: TopicItemStoreSaveCompletedActionPayload) => void;
}
