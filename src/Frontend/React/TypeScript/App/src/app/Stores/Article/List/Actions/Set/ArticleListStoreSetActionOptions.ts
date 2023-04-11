import {
  type ArticleListStoreSetActionCallback,
  type StoreDispatchOptions,
  type ArticleListStoreSetActionPayload
} from '../../../../../../all';

export interface ArticleListStoreSetActionOptions extends StoreDispatchOptions {
  callback?: ArticleListStoreSetActionCallback;
  responseAtDispatch?: ArticleListStoreSetActionPayload;
}
