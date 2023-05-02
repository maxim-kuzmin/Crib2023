import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreDeleteCompletedActionCallback } from './ArticleItemStoreDeleteCompletedActionCallback';
import { type ArticleItemStoreDeleteCompletedActionPayload } from './ArticleItemStoreDeleteCompletedActionPayload';

export interface ArticleItemStoreDeleteCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly payloadOfDeleteCompletedAction?: ArticleItemStoreDeleteCompletedActionPayload;
}
