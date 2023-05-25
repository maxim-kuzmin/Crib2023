import { type TopicTreeStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatch';
import { type TopicTreeStoreSetActionResult } from './TopicTreeStoreSetActionResult';

export interface TopicTreeStoreSetActionOutput {
  readonly dispatchOfSetAction: TopicTreeStoreSetActionDispatch;
  readonly resultOfSetAction: TopicTreeStoreSetActionResult;
}
