import { type TopicItemStoreSetActionResult } from './TopicItemStoreSetActionResult';

export interface TopicItemStoreSetActionDispatch {
  readonly run: (actionResult: TopicItemStoreSetActionResult) => void;
}
