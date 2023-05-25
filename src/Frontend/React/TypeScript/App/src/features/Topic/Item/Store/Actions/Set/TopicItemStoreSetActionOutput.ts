import { type TopicItemStoreSetActionDispatch } from './TopicItemStoreSetActionDispatch';
import { type TopicItemStoreSetActionResult } from './TopicItemStoreSetActionResult';

export interface TopicItemStoreSetActionOutput {
  readonly dispatchOfSetAction: TopicItemStoreSetActionDispatch;
  readonly resultOfSetAction: TopicItemStoreSetActionResult;
}
