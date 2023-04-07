import { type ArticlePageService, type ArticlePageUrlOptions } from '../../../all';

export class ArticlePageServiceImpl implements ArticlePageService {
  createUrl (options?: ArticlePageUrlOptions) {
    let result = '/article';

    let articleId = 0;

    if (options) {
      if (options.articleId) {
        articleId = options.articleId;
      }
    }

    if (articleId > 0) {
      result += `/${articleId}`;
    }

    return result;
  }
}
