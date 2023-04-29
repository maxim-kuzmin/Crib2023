import {
  type ArticleItemEditViewModule,
  createArticleItemEditViewModule,
} from './Edit/ArticleItemEditViewModule';

export interface ArticleItemViewModule {
  readonly Edit: ArticleItemEditViewModule;
}

export function createArticleItemViewModule (): ArticleItemViewModule {
  const moduleOfEdit = createArticleItemEditViewModule();

  return {
    Edit: moduleOfEdit
  };
}
