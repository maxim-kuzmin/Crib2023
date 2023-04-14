import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreSetActionCallback } from './ArticleListStoreSetActionCallback';
import { type ArticleListStoreSetActionPayload } from './ArticleListStoreSetActionPayload';

export interface ArticleListStoreSetActionOptions extends StoreActionOptions {
  callback?: ArticleListStoreSetActionCallback;
  payload?: ArticleListStoreSetActionPayload;
}
