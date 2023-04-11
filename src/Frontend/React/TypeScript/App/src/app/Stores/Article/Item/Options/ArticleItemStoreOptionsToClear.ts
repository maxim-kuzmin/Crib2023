import { type ArticleItemStoreCallbackToClear, type StoreDispatchOptions } from '../../../../../all';

export interface ArticleItemStoreOptionsToClear extends StoreDispatchOptions {
  callback?: ArticleItemStoreCallbackToClear;
}
