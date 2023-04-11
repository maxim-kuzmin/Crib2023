import {
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreSetActionCallback,
  type StoreActionOptions
} from '../../../../../../all';

export interface TopicTreeStoreLoadActionOptions extends StoreActionOptions {
  callback?: TopicTreeStoreSetActionCallback;
  payload: TopicTreeStoreLoadActionPayload;
}
