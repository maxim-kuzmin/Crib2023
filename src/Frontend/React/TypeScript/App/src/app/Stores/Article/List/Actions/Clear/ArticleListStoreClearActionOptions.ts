import { type ArticleListStoreClearActionCallback, type StoreActionOptions } from '../../../../../../all';

export interface ArticleListStoreClearActionOptions extends StoreActionOptions {
  callback?: ArticleListStoreClearActionCallback;
}
