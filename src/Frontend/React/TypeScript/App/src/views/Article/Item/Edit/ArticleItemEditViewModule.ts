import { type ArticleItemEditViewService } from './ArticleItemEditViewService';
import { ArticleItemEditViewServiceImpl } from './ArticleItemEditViewServiceImpl';

export interface ArticleItemEditViewModule {
  readonly getService: () => ArticleItemEditViewService;
}

export function createArticleItemEditViewModule (): ArticleItemEditViewModule {
  const implOfService = new ArticleItemEditViewServiceImpl();

  function getService (): ArticleItemEditViewService {
    return implOfService;
  }

  return { getService };
}
