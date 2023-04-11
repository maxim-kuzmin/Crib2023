import {
  type TopicItemStoreSetActionCallback,
  type StoreActionOptions,
  type TopicItemStoreSetActionPayload
} from '../../../../../../all';

export interface TopicItemStoreSetActionOptions extends StoreActionOptions {
  callback?: TopicItemStoreSetActionCallback;
  responseAtDispatch?: TopicItemStoreSetActionPayload;
}
