import { type ArticleItemViewModule } from './Item';
import { createArticleItemViewModule } from './Item/ArticleItemViewModule';

export interface ArticleViewModule {
  readonly Item: ArticleItemViewModule;
}

export function createArticleViewModule (): ArticleViewModule {
  const moduleOfItem = createArticleItemViewModule();

  return {
    Item: moduleOfItem
  };
}
