import { type ArticleItemStoreClearActionCallback, type StoreActionOptions } from '../../../../../../all';

export interface ArticleItemStoreClearActionOptions extends StoreActionOptions {
  callback?: ArticleItemStoreClearActionCallback;
}
