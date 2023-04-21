import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleItemStoreClearActionCallback } from './ArticleItemStoreClearActionCallback';

export interface ArticleItemStoreClearActionOptions extends StoreActionOptions {
  readonly callback?: ArticleItemStoreClearActionCallback;
}
