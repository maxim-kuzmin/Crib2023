import {
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreSetActionCallback,
  type StoreActionOptions
} from '../../../../../../all';

export interface TopicItemStoreLoadActionOptions extends StoreActionOptions {
  callback?: TopicItemStoreSetActionCallback;
  inputAtDispatch: TopicItemStoreLoadActionPayload;
}
