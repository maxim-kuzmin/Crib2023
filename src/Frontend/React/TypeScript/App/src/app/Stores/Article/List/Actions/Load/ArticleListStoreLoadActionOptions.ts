import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreSetActionCallback,
  type StoreDispatchOptions
} from '../../../../../../all';

export interface ArticleListStoreLoadActionOptions extends StoreDispatchOptions {
  callback?: ArticleListStoreSetActionCallback;
  inputAtDispatch: ArticleListStoreLoadActionPayload;
}
