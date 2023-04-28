import { type ArticleViewModule } from './Article';
import { createArticleViewModule } from './Article/ArticleViewModule';

export interface ViewsModule {
  readonly Article: ArticleViewModule;
}

export function createViewsModule (): ViewsModule {
  const moduleOfArticleView = createArticleViewModule();

  return {
    Article: moduleOfArticleView
  };
}
