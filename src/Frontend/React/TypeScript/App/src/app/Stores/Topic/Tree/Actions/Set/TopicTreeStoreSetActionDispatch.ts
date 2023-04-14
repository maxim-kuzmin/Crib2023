import { type TopicTreeStoreSetActionPayload } from './TopicTreeStoreSetActionPayload';

export interface TopicTreeStoreSetActionDispatch {
  run: (payload: TopicTreeStoreSetActionPayload) => void;
}
