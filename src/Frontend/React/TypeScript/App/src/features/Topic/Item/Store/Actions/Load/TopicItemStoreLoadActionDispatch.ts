import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionDispatch {
  readonly run: (payload: TopicItemStoreLoadActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
