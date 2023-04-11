import {
  type ArticleItemStoreSetActionCallback,
  type StoreDispatchOptions,
  type ArticleItemStoreSetActionPayload
} from '../../../../../../all';

export interface ArticleItemStoreSetActionOptions extends StoreDispatchOptions {
  callback?: ArticleItemStoreSetActionCallback;
  responseAtDispatch?: ArticleItemStoreSetActionPayload;
}
