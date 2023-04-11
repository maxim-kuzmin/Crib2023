import {
  type TopicTreeStoreSetActionCallback,
  type StoreActionOptions,
  type TopicTreeStoreSetActionPayload
} from '../../../../../../all';

export interface TopicTreeStoreSetActionOptions extends StoreActionOptions {
  callback?: TopicTreeStoreSetActionCallback;
  responseAtDispatch?: TopicTreeStoreSetActionPayload;
}
