import { type TopicTreeStoreSetActionDispatch } from './TopicTreeStoreSetActionDispatch';
import { type TopicTreeStoreSetActionPayload } from './TopicTreeStoreSetActionPayload';

export interface TopicTreeStoreSetActionOutput {
  readonly dispatchOfSetAction: TopicTreeStoreSetActionDispatch;
  readonly payloadOfSetAction: TopicTreeStoreSetActionPayload;
}
