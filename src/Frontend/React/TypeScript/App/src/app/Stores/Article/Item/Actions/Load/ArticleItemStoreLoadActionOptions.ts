import {
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionCallback,
  type StoreActionOptions
} from '../../../../../../all';

export interface ArticleItemStoreLoadActionOptions extends StoreActionOptions {
  callback?: ArticleItemStoreSetActionCallback;
  inputAtDispatch: ArticleItemStoreLoadActionPayload;
}
