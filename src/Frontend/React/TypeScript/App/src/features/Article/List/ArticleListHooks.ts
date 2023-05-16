import { type ArticleListStoreHooks } from './Store';

export interface ArticleListHooks {
  readonly Store: ArticleListStoreHooks;
}

interface Options {
  readonly createArticleListStoreHooks: () => ArticleListStoreHooks;
}

class Implementation implements ArticleListHooks {
  readonly Store: ArticleListStoreHooks;

  constructor ({
    createArticleListStoreHooks
  }: Options) {
    this.Store = createArticleListStoreHooks();
  }
}

export function createArticleListHooks (options: Options): ArticleListHooks {
  return new Implementation(options);
}
