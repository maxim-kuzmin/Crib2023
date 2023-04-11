import {
  type ArticleItemStoreLoadActionPayload,
  type ArticleItemStoreSetActionCallback,
  type StoreDispatchOptions
} from '../../../../../../all';

export interface ArticleItemStoreLoadActionOptions extends StoreDispatchOptions {
  callback?: ArticleItemStoreSetActionCallback;
  inputAtDispatch: ArticleItemStoreLoadActionPayload;
}
