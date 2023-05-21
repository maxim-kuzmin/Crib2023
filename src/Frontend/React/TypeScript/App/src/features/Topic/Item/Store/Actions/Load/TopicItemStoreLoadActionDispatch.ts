import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionDispatch {
  readonly run: (
    payload: TopicItemStoreLoadActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
