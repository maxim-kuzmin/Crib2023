import { type TopicTreeStoreLoadCompletedActionPayload } from './TopicTreeStoreLoadCompletedActionPayload';

export interface TopicTreeStoreLoadCompletedActionDispatch {
  readonly run: (payload: TopicTreeStoreLoadCompletedActionPayload) => void;
}
