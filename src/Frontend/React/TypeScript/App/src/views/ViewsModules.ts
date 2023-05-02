import { type ArticleViewModules } from './Article';
import { createArticleViewModules } from './Article/ArticleViewModules';

export interface ViewsModules {
  readonly Article: ArticleViewModules;
}

export function createViewsModules (): ViewsModules {
  const modulesOfArticle = createArticleViewModules();

  return {
    Article: modulesOfArticle
  };
}
