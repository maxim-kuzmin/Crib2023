import { type TopicItemStoreSaveActionPayload } from './TopicItemStoreSaveActionPayload';

export interface TopicItemStoreSaveActionDispatch {
  readonly run: (payload: TopicItemStoreSaveActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
