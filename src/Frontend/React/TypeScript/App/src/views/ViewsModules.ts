import { type ArticleViewModules, createArticleViewModules } from '.';

export interface ViewsModules {
  readonly Article: ArticleViewModules;
}

class Implementation implements ViewsModules {
  readonly Article: ArticleViewModules;

  constructor () {
    this.Article = createArticleViewModules();
  }
}

export function createViewsModules (): ViewsModules {
  return new Implementation();
}
