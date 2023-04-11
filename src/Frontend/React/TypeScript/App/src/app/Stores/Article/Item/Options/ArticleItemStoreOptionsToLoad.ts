import {
  type ArticleItemStoreContentForInput,
  type ArticleItemStoreCallbackToSet,
  type StoreDispatchOptions
} from '../../../../../all';

export interface ArticleItemStoreOptionsToLoad extends StoreDispatchOptions {
  callback?: ArticleItemStoreCallbackToSet;
  inputAtDispatch: ArticleItemStoreContentForInput;
}
