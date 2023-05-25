import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionCallback } from './ArticleItemStoreSetActionCallback';
import { type ArticleItemStoreSetActionResult } from './ArticleItemStoreSetActionResult';

export interface ArticleItemStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly resultOfSetAction?: ArticleItemStoreSetActionResult;
}
