import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreDeleteCompletedActionCallback } from './ArticleItemStoreDeleteCompletedActionCallback';
import { type ArticleItemStoreDeleteCompletedActionPayload } from './ArticleItemStoreDeleteCompletedActionPayload';

export interface ArticleItemStoreDeleteCompletedActionOptions extends StoreActionOptions {
  callback?: ArticleItemStoreDeleteCompletedActionCallback;
  payload?: ArticleItemStoreDeleteCompletedActionPayload;
}
