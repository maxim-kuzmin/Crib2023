import {
  type ArticleItemEditViewModule,
  createArticleItemEditViewModule,
} from './Edit/ArticleItemEditViewModule';

export interface ArticleItemViewModules {
  readonly Edit: ArticleItemEditViewModule;
}

export function createArticleItemViewModules (): ArticleItemViewModules {
  const moduleOfEdit = createArticleItemEditViewModule();

  return {
    Edit: moduleOfEdit
  };
}
