import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionCallback } from '../Set';
import { type ArticleItemStoreLoadActionPayload } from './ArticleItemStoreLoadActionPayload';

export interface ArticleItemStoreLoadActionOptions extends StoreActionOptions {
  callback?: ArticleItemStoreSetActionCallback;
  payload: ArticleItemStoreLoadActionPayload;
}
