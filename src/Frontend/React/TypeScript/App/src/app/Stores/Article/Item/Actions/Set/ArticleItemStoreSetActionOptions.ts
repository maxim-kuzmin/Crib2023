import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionCallback } from './ArticleItemStoreSetActionCallback';
import { type ArticleItemStoreSetActionPayload } from './ArticleItemStoreSetActionPayload';

export interface ArticleItemStoreSetActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly payloadOfSetAction?: ArticleItemStoreSetActionPayload;
}
