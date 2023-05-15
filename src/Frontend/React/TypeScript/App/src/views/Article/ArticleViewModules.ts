import { type ArticleItemViewModules, createArticleItemViewModules } from './Item';

export interface ArticleViewModules {
  readonly Item: ArticleItemViewModules;
}

class Implementation implements ArticleViewModules {
  readonly Item: ArticleItemViewModules;

  constructor () {
    this.Item = createArticleItemViewModules();
  }
}

export function createArticleViewModules (): ArticleViewModules {
  return new Implementation();
}
