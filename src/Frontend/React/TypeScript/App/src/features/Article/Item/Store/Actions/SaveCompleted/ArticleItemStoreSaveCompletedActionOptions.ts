import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSaveCompletedActionCallback } from './ArticleItemStoreSaveCompletedActionCallback';
import { type ArticleItemStoreSaveCompletedActionResult } from './ArticleItemStoreSaveCompletedActionResult';

export interface ArticleItemStoreSaveCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSaveCompletedActionCallback;
  readonly resultOfSaveCompletedAction?: ArticleItemStoreSaveCompletedActionResult;
}
