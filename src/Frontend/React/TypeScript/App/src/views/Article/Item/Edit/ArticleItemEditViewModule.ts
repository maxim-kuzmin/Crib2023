import { type ArticleItemEditViewService, createArticleItemEditViewService } from './ArticleItemEditViewService';

export interface ArticleItemEditViewModule {
  readonly getService: () => ArticleItemEditViewService;
}

class Implementation implements ArticleItemEditViewModule {
  private readonly implOfService = createArticleItemEditViewService();

  getService (): ArticleItemEditViewService {
    return this.implOfService;
  }
}

export function createArticleItemEditViewModule (): ArticleItemEditViewModule {
  return new Implementation();
}
