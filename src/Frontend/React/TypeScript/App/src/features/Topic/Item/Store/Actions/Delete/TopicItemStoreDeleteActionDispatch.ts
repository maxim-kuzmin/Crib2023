import { type TopicItemStoreDeleteActionPayload } from './TopicItemStoreDeleteActionPayload';

export interface TopicItemStoreDeleteActionDispatch {
  readonly run: (
    payload: TopicItemStoreDeleteActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
