import { type ArticleItemStoreHooks } from './Item';
import { type ArticleListStoreHooks } from './List';

export interface ArticleStoreHooks {
  readonly Item: ArticleItemStoreHooks;
  readonly List: ArticleListStoreHooks;
}
