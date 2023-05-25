import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreDeleteCompletedActionCallback } from '../DeleteCompleted';
import { type ArticleItemStoreDeleteActionResult } from './ArticleItemStoreDeleteActionResult';

export interface ArticleItemStoreDeleteActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly resultOfDeleteAction?: ArticleItemStoreDeleteActionResult;
}
