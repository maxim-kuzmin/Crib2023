import { type ArticleStoreHooks } from '../../app';
import { createArticleItemStoreHooks } from './Item/ArticleItemStoreHooks';
import { createArticleListStoreHooks } from './List/ArticleListStoreHooks';

export function createArticleStoreHooks (): ArticleStoreHooks {
  const hooksOfItem = createArticleItemStoreHooks();
  const hooksOfList = createArticleListStoreHooks();

  return {
    Item: hooksOfItem,
    List: hooksOfList,
  };
}
