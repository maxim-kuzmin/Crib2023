import { type ArticlePageService, createArticlePageService } from './ArticlePageService';

export interface ArticlePageModule {
  readonly getService: () => ArticlePageService;
}

class Implementation implements ArticlePageModule {
  private readonly service = createArticlePageService();

  getService (): ArticlePageService {
    return this.service;
  }
}

export function createArticlePageModule (): ArticlePageModule {
  return new Implementation();
}
