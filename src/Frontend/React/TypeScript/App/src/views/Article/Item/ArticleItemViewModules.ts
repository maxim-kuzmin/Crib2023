import {
  type ArticleItemEditViewModule,
  createArticleItemEditViewModule,
} from './Edit/ArticleItemEditViewModule';

export interface ArticleItemViewModules {
  readonly Edit: ArticleItemEditViewModule;
}

class Implementation implements ArticleItemViewModules {
  readonly Edit: ArticleItemEditViewModule;

  constructor () {
    this.Edit = createArticleItemEditViewModule();
  }
}
export function createArticleItemViewModules (): ArticleItemViewModules {
  return new Implementation();
}
