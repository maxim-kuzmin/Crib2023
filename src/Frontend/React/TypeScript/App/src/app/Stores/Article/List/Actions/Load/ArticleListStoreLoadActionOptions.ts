import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreSetActionCallback } from '../Set';
import { type ArticleListStoreLoadActionPayload } from './ArticleListStoreLoadActionPayload';

export interface ArticleListStoreLoadActionOptions extends StoreActionOptions {
  readonly callback?: ArticleListStoreSetActionCallback;
  readonly payload: ArticleListStoreLoadActionPayload;
}
