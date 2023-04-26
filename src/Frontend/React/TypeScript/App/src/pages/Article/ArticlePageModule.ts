import { type ArticlePageService } from './ArticlePageService';
import { ArticlePageServiceImpl } from './ArticlePageServiceImpl';

export interface ArticlePageModule {
  readonly getService: () => ArticlePageService;
}

export function createArticlePageModule (): ArticlePageModule {
  const implOfArticlePageService = new ArticlePageServiceImpl();

  function getService (): ArticlePageService {
    return implOfArticlePageService;
  }

  return { getService };
}
