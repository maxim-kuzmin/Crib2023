import { type TopicItemStoreDeleteActionPayload } from './TopicItemStoreDeleteActionPayload';

export interface TopicItemStoreDeleteActionDispatch {
  readonly run: (payload: TopicItemStoreDeleteActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
