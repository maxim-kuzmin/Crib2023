import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionCallback } from '../Set';
import { type ArticleItemStoreDeleteActionPayload } from './ArticleItemStoreDeleteActionPayload';

export interface ArticleItemStoreDeleteActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly payload: ArticleItemStoreDeleteActionPayload;
}
