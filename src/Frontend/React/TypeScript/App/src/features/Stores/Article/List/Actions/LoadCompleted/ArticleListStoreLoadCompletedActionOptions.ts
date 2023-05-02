import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreLoadCompletedActionCallback } from './ArticleListStoreLoadCompletedActionCallback';
import { type ArticleListStoreLoadCompletedActionPayload } from './ArticleListStoreLoadCompletedActionPayload';

export interface ArticleListStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: ArticleListStoreLoadCompletedActionCallback;
  readonly payloadOfLoadCompletedAction?: ArticleListStoreLoadCompletedActionPayload;
}
