import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreDeleteCompletedActionCallback } from '../DeleteCompleted';
import { type ArticleItemStoreDeleteActionPayload } from './ArticleItemStoreDeleteActionPayload';

export interface ArticleItemStoreDeleteActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreDeleteCompletedActionCallback;
  readonly payload: ArticleItemStoreDeleteActionPayload;
}
