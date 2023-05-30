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

class Implementation implements ArticleViewHooks {
  readonly Item: ArticleItemViewHooks;
  readonly Table: ArticleTableViewHooks;

  constructor ({
    hooksOfArticleItemStore,
    hooksOfArticleListStore,
    pathOfArticleItemViewResource,
    pathOfArticleItemEditViewResource,
    pathOfArticleTableViewResource,
  }: Options) {
    this.Item = createArticleItemViewHooks({
      hooksOfArticleItemStore,
      pathOfArticleItemViewResource,
      pathOfArticleItemEditViewResource,
    });

    this.Table = createArticleTableViewHooks({
      hooksOfArticleListStore,
      pathOfArticleTableViewResource,
    });
  }
}

export function createArticleViewHooks (options: Options): ArticleViewHooks {
  return new Implementation(options);
}
