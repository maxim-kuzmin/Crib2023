import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionResult } from './ArticleItemStoreSetActionResult';

export interface ArticleItemStoreSetActionOptions extends StoreActionOptions {
  readonly resultOfSetAction?: ArticleItemStoreSetActionResult;
}
