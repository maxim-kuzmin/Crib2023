import { type TopicTreeStoreSetActionResult } from './TopicTreeStoreSetActionResult';

export interface TopicTreeStoreSetActionDispatch {
  readonly run: (actionResult: TopicTreeStoreSetActionResult) => void;
}
