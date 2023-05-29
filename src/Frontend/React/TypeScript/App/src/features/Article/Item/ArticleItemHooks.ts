import { type ArticleItemStoreHooks } from './Store';

export interface ArticleItemHooks {
  readonly Store: ArticleItemStoreHooks;
}

interface Options {
  readonly createArticleItemStoreHooks: (options: {
    readonly pathOfArticleItemStoreResource: string;
  }) => ArticleItemStoreHooks;

  pathOfArticleItemStoreResource: string;
}

class Implementation implements ArticleItemHooks {
  readonly Store: ArticleItemStoreHooks;

  constructor ({
    createArticleItemStoreHooks,
    pathOfArticleItemStoreResource,
  }: Options) {
    this.Store = createArticleItemStoreHooks({ pathOfArticleItemStoreResource });
  }
}

export function createArticleItemHooks (options: Options): ArticleItemHooks {
  return new Implementation(options);
}
