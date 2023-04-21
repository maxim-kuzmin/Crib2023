import { type TopicItemStoreSetActionDispatch } from './TopicItemStoreSetActionDispatch';
import { type TopicItemStoreSetActionPayload } from './TopicItemStoreSetActionPayload';

export interface TopicItemStoreSetActionOutput {
  readonly dispatchOfSetAction: TopicItemStoreSetActionDispatch;
  readonly payloadOfSetAction: TopicItemStoreSetActionPayload;
}
