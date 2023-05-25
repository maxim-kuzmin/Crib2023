import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionCallback } from '../Set';
import { type ArticleItemStoreSaveActionResult } from './ArticleItemStoreSaveActionResult';

export interface ArticleItemStoreSaveActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly resultOfSaveAction?: ArticleItemStoreSaveActionResult;
}
