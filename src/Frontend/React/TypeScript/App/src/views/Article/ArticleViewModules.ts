import { type ArticleItemViewModules } from './Item';
import { createArticleItemViewModules } from './Item/ArticleItemViewModules';

export interface ArticleViewModules {
  readonly Item: ArticleItemViewModules;
}

export function createArticleViewModules (): ArticleViewModules {
  const modulesOfItem = createArticleItemViewModules();

  return {
    Item: modulesOfItem
  };
}
