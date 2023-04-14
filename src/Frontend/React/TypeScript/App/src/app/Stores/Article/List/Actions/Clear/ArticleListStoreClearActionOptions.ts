import { type StoreActionOptions } from '../../../../../../common';
import { type ArticleListStoreClearActionCallback } from './ArticleListStoreClearActionCallback';

export interface ArticleListStoreClearActionOptions extends StoreActionOptions {
  callback?: ArticleListStoreClearActionCallback;
}
