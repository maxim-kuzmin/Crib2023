import { type ArticleItemStoreHooks, type ArticleListStoreHooks } from '../../features';
import { type ArticleItemViewHooks, createArticleItemViewHooks } from './Item';
import { type ArticleTableViewHooks } from './Table';
import { createArticleTableViewHooks } from './Table/ArticleTableViewHooks';

export interface ArticleViewHooks {
  readonly Item: ArticleItemViewHooks;
  readonly Table: ArticleTableViewHooks;
}

interface Options {
  readonly hooksOfArticleItemStore: ArticleItemStoreHooks;
  readonly hooksOfArticleListStore: ArticleListStoreHooks;
  readonly pathOfArticleItemViewResource: string;
  readonly pathOfArticleItemEditViewResource: string;
  readonly pathOfArticleTableViewResource: string;
}

export function createArticleViewHooks ({
  hooksOfArticleItemStore,
  hooksOfArticleListStore,
  pathOfArticleItemViewResource,
  pathOfArticleItemEditViewResource,
  pathOfArticleTableViewResource,
}: Options): ArticleViewHooks {
  const hooksOfItem = createArticleItemViewHooks({
    hooksOfArticleItemStore,
    pathOfArticleItemViewResource,
    pathOfArticleItemEditViewResource,
  });
  const hooksOfTable = createArticleTableViewHooks({ hooksOfArticleListStore, pathOfArticleTableViewResource });

  return {
    Item: hooksOfItem,
    Table: hooksOfTable,
  };
}
