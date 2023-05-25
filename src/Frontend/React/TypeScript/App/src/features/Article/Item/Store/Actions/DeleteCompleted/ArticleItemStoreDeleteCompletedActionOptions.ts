import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreDeleteCompletedActionCallback } from './ArticleItemStoreDeleteCompletedActionCallback';
import { type ArticleItemStoreDeleteCompletedActionResult } from './ArticleItemStoreDeleteCompletedActionResult';

export interface ArticleItemStoreDeleteCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly resultOfDeleteCompletedAction?: ArticleItemStoreDeleteCompletedActionResult;
}
