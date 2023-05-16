import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreSetActionCallback } from '../Set';
import { type ArticleItemStoreSaveActionPayload } from './ArticleItemStoreSaveActionPayload';

export interface ArticleItemStoreSaveActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreSetActionCallback;
  readonly payloadOfSaveAction?: ArticleItemStoreSaveActionPayload;
}
