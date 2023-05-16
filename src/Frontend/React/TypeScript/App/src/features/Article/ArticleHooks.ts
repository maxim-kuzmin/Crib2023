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
  readonly createArticleItemStoreHooks: () => ArticleItemStoreHooks;
  readonly createArticleListStoreHooks: () => ArticleListStoreHooks;
}

class Implementation implements ArticleHooks {
  readonly Item: ArticleItemHooks;
  readonly List: ArticleListHooks;

  constructor ({
    createArticleItemStoreHooks,
    createArticleListStoreHooks,
  }: Options) {
    this.Item = createArticleItemHooks({ createArticleItemStoreHooks });
    this.List = createArticleListHooks({ createArticleListStoreHooks });
  }
}

export function createArticleHooks (options: Options): ArticleHooks {
  return new Implementation(options);
}
