import {
  type ArticleItemStoreSetActionCallback,
  type StoreActionOptions,
  type ArticleItemStoreSetActionPayload
} from '../../../../../../all';

export interface ArticleItemStoreSetActionOptions extends StoreActionOptions {
  callback?: ArticleItemStoreSetActionCallback;
  payload?: ArticleItemStoreSetActionPayload;
}
