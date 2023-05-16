import { type ArticleItemStoreHooks } from './Store';

export interface ArticleItemHooks {
  readonly Store: ArticleItemStoreHooks;
}

interface Options {
  readonly createArticleItemStoreHooks: () => ArticleItemStoreHooks;
}

class Implementation implements ArticleItemHooks {
  readonly Store: ArticleItemStoreHooks;

  constructor ({
    createArticleItemStoreHooks
  }: Options) {
    this.Store = createArticleItemStoreHooks();
  }
}

export function createArticleItemHooks (options: Options): ArticleItemHooks {
  return new Implementation(options);
}
