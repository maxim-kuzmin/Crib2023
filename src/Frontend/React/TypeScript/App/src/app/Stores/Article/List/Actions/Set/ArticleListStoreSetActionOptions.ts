import {
  type ArticleListStoreSetActionCallback,
  type StoreActionOptions,
  type ArticleListStoreSetActionPayload
} from '../../../../../../all';

export interface ArticleListStoreSetActionOptions extends StoreActionOptions {
  callback?: ArticleListStoreSetActionCallback;
  payload?: ArticleListStoreSetActionPayload;
}
