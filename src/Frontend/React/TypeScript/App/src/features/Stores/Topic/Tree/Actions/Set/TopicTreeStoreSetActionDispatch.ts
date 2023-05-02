import { type TopicTreeStoreSetActionPayload } from './TopicTreeStoreSetActionPayload';

export interface TopicTreeStoreSetActionDispatch {
  readonly run: (payload: TopicTreeStoreSetActionPayload) => void;
}
