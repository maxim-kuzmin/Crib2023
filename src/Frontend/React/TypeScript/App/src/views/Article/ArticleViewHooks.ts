import { type ArticleItemStoreHooks, type ArticleListStoreHooks } from '../../app';
import { type ArticleItemViewHooks } from './Item';
import { createArticleItemViewHooks } from './Item/ArticleItemViewHooks';
import { type ArticleTableViewHooks } from './Table';
import { createArticleTableViewHooks } from './Table/ArticleTableViewHooks';

export interface ArticleViewHooks {
  readonly Item: ArticleItemViewHooks;
  readonly Table: ArticleTableViewHooks;
}

interface Options {
  readonly hooksOfArticleItemStore: ArticleItemStoreHooks;
  readonly hooksOfArticleListStore: ArticleListStoreHooks;
}

export function createArticleViewHooks ({
  hooksOfArticleItemStore,
  hooksOfArticleListStore
}: Options): ArticleViewHooks {
  const hooksOfItem = createArticleItemViewHooks({ hooksOfArticleItemStore });
  const hooksOfTable = createArticleTableViewHooks({ hooksOfArticleListStore });

  return {
    Item: hooksOfItem,
    Table: hooksOfTable,
  };
}
