import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreLoadCompletedActionCallback } from './ArticleItemStoreLoadCompletedActionCallback';
import { type ArticleItemStoreLoadCompletedActionResult } from './ArticleItemStoreLoadCompletedActionResult';

export interface ArticleItemStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreLoadCompletedActionCallback;
  readonly resultOfLoadCompletedAction?: ArticleItemStoreLoadCompletedActionResult;
}
