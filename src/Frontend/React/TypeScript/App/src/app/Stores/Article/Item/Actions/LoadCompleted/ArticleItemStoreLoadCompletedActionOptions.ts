import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreLoadCompletedActionCallback } from './ArticleItemStoreLoadCompletedActionCallback';
import { type ArticleItemStoreLoadCompletedActionPayload } from './ArticleItemStoreLoadCompletedActionPayload';

export interface ArticleItemStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreLoadCompletedActionCallback;
  readonly payload?: ArticleItemStoreLoadCompletedActionPayload;
}
