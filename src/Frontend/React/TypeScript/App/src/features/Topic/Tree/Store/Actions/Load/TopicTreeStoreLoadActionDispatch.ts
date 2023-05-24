import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionDispatch {
  readonly run: (payload: TopicTreeStoreLoadActionPayload, abortSignal?: AbortSignal) => Promise<void>;
}
