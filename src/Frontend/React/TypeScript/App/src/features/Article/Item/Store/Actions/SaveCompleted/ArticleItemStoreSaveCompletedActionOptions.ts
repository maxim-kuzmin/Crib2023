import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSaveCompletedActionCallback } from './ArticleItemStoreSaveCompletedActionCallback';
import { type ArticleItemStoreSaveCompletedActionPayload } from './ArticleItemStoreSaveCompletedActionPayload';

export interface ArticleItemStoreSaveCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSaveCompletedActionCallback;
  readonly payloadOfSaveCompletedAction?: ArticleItemStoreSaveCompletedActionPayload;
}
