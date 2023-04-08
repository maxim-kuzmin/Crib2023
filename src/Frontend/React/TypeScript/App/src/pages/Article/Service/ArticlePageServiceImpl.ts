import { type ArticlePageService, type ArticlePageUrlOptions } from '../../../all';

export class ArticlePageServiceImpl implements ArticlePageService {
  createUrl (options?: ArticlePageUrlOptions) {
    let result = '/article';

    let articleId = 0;

    let isEdit = false;

    if (options) {
      if (options.articleId) {
        articleId = options.articleId;
      }

      if (options.isEdit) {
        isEdit = true;
      }
    }

    if (articleId > 0) {
      result += `/${articleId}`;
    }

    if (isEdit) {
      result += '/edit';
    }

    return result;
  }
}
