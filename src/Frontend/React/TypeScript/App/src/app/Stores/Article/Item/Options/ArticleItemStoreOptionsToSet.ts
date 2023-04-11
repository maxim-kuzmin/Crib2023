import {
  type ArticleItemStoreContentForResponse,
  type ArticleItemStoreCallbackToSet,
  type StoreDispatchOptions
} from '../../../../../all';

export interface ArticleItemStoreOptionsToSet extends StoreDispatchOptions {
  callback?: ArticleItemStoreCallbackToSet;
  responseAtDispatch?: ArticleItemStoreContentForResponse;
}
