import {
  type ArticleItemStoreHooks,
  type ArticleItemHooks,
  createArticleItemHooks,
} from './Item';
import {
  type ArticleListStoreHooks,
  type ArticleListHooks,
  createArticleListHooks,
} from './List';

export interface ArticleHooks {
  readonly Item: ArticleItemHooks;
  readonly List: ArticleListHooks;
}

interface Options {
  readonly createArticleItemStoreHooks: (options: {
    readonly pathOfArticleItemStoreResource: string;
  }) => ArticleItemStoreHooks;

  readonly createArticleListStoreHooks: (options: {
    readonly pathOfArticleListStoreResource: string;
  }) => ArticleListStoreHooks;

  readonly pathOfArticleItemStoreResource: string;
  readonly pathOfArticleListStoreResource: string;
}

class Implementation implements ArticleHooks {
  readonly Item: ArticleItemHooks;
  readonly List: ArticleListHooks;

  constructor ({
    createArticleItemStoreHooks,
    createArticleListStoreHooks,
    pathOfArticleItemStoreResource,
    pathOfArticleListStoreResource,
  }: Options) {
    this.Item = createArticleItemHooks({ createArticleItemStoreHooks, pathOfArticleItemStoreResource });
    this.List = createArticleListHooks({ createArticleListStoreHooks, pathOfArticleListStoreResource });
  }
}

export function createArticleHooks (options: Options): ArticleHooks {
  return new Implementation(options);
}
