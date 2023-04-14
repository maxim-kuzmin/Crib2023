import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreSetActionCallback } from '../Set';
import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionOptions extends StoreActionOptions {
  callback?: ArticleListStoreSetActionCallback;
  payload: ArticleListStoreLoadActionPayload;
}
