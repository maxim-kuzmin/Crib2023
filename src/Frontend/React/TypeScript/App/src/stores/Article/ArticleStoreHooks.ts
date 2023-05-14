import { type ArticleStoreHooks } from '../../features';
import { createArticleItemStoreHooks } from './Item';
import { createArticleListStoreHooks } from './List';

export function createArticleStoreHooks (): ArticleStoreHooks {
  const hooksOfItem = createArticleItemStoreHooks();
  const hooksOfList = createArticleListStoreHooks();

  return {
    Item: hooksOfItem,
    List: hooksOfList,
  };
}
