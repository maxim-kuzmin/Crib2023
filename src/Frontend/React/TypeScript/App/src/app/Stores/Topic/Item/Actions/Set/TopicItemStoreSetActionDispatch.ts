import { type TopicItemStoreSetActionPayload } from './TopicItemStoreSetActionPayload';

export interface TopicItemStoreSetActionDispatch {
  run: (payload: TopicItemStoreSetActionPayload) => void;
}
