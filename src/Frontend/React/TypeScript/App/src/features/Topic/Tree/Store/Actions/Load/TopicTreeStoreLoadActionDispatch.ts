import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionDispatch {
  readonly run: (
    payload: TopicTreeStoreLoadActionPayload,
    abortController?: AbortController
  ) => Promise<void>;
}
