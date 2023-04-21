import { type TopicItemStoreSetActionPayload } from './TopicItemStoreSetActionPayload';

export interface TopicItemStoreSetActionDispatch {
  readonly run: (payload: TopicItemStoreSetActionPayload) => void;
}
