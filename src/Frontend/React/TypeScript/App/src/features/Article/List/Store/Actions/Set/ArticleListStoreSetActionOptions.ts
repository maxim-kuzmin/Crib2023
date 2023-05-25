import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreSetActionCallback } from './ArticleListStoreSetActionCallback';
import { type ArticleListStoreSetActionResult } from './ArticleListStoreSetActionResult';

export interface ArticleListStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: ArticleListStoreSetActionCallback;
  readonly resultOfSetAction?: ArticleListStoreSetActionResult;
}
