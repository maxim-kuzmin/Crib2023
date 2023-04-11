import {
  type ArticleListStoreLoadActionPayload,
  type ArticleListStoreSetActionCallback,
  type StoreActionOptions
} from '../../../../../../all';

export interface ArticleListStoreLoadActionOptions extends StoreActionOptions {
  callback?: ArticleListStoreSetActionCallback;
  payload: ArticleListStoreLoadActionPayload;
}
