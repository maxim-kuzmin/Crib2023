import { type ArticleItemEditViewService, createArticleItemEditViewService } from './ArticleItemEditViewService';

export interface ArticleItemEditViewModule {
  readonly getService: () => ArticleItemEditViewService;
}

class Implementation implements ArticleItemEditViewModule {
  private readonly service = createArticleItemEditViewService();

  getService (): ArticleItemEditViewService {
    return this.service;
  }
}

export function createArticleItemEditViewModule (): ArticleItemEditViewModule {
  return new Implementation();
}
