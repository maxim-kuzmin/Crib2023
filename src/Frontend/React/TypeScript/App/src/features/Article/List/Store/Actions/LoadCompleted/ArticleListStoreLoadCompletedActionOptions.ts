import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreLoadCompletedActionCallback } from './ArticleListStoreLoadCompletedActionCallback';
import { type ArticleListStoreLoadCompletedActionResult } from './ArticleListStoreLoadCompletedActionResult';

export interface ArticleListStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleListStoreLoadCompletedActionCallback;
  readonly resultOfLoadCompletedAction?: ArticleListStoreLoadCompletedActionResult;
}
