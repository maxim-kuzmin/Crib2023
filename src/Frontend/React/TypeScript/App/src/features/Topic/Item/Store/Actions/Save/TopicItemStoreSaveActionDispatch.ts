import { type TopicItemStoreSaveActionPayload } from './TopicItemStoreSaveActionPayload';

export interface TopicItemStoreSaveActionDispatch {
  readonly run: (
    payload: TopicItemStoreSaveActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
