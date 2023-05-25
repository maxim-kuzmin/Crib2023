import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreSetActionCallback } from '../Set';
import { type ArticleListStoreLoadActionResult } from './ArticleListStoreLoadActionResult';

export interface ArticleListStoreLoadActionOptions extends StoreActionOptions {
  readonly callback?: ArticleListStoreSetActionCallback;
  readonly resultOfLoadAction?: ArticleListStoreLoadActionResult;
}
