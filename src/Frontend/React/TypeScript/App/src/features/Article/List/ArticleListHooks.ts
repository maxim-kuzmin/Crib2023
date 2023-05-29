import { type ArticleListStoreHooks } from './Store';

export interface ArticleListHooks {
  readonly Store: ArticleListStoreHooks;
}

interface Options {
  readonly createArticleListStoreHooks: (options: {
    readonly pathOfArticleListStoreResource: string;
  }) => ArticleListStoreHooks;

  readonly pathOfArticleListStoreResource: string;
}

class Implementation implements ArticleListHooks {
  readonly Store: ArticleListStoreHooks;

  constructor ({
    createArticleListStoreHooks,
    pathOfArticleListStoreResource,
  }: Options) {
    this.Store = createArticleListStoreHooks({ pathOfArticleListStoreResource });
  }
}

export function createArticleListHooks (options: Options): ArticleListHooks {
  return new Implementation(options);
}
