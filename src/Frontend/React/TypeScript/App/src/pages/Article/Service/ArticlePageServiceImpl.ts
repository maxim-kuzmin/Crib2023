import {
  type ArticlePageUrlSearch,
  type ArticlePageService,
  type ArticlePageUrlOptions,
  ArticlePageMode
} from '../../../all';

const topicIdParamName = 'topicId';

export class ArticlePageServiceImpl implements ArticlePageService {
  createUrl (options?: ArticlePageUrlOptions) {
    let result = '/article';

    let articleId = 0;

    let search: ArticlePageUrlSearch = {
      topicId: 0
    };

    let mode: ArticlePageMode = ArticlePageMode.Display;

    if (options) {
      if (options.articleId) {
        articleId = options.articleId;
      }

      if (options.mode) {
        mode = options.mode;
      }

      if (options.search) {
        search = options.search;
      }
    }

    if (articleId > 0) {
      result += `/${articleId}`;

      if (mode === ArticlePageMode.Edit) {
        result += '/edit';
      }
    }

    const searchParams = new URLSearchParams();

    this.updateURLSearchParams(searchParams, search);

    const searchParamsString = searchParams.toString();

    if (searchParamsString) {
      result += `?${searchParamsString}`;
    }

    return result;
  }

  getUrlSearch (searchParams: URLSearchParams): ArticlePageUrlSearch {
    return {
      topicId: Number(searchParams.get(topicIdParamName) ?? 0)
    };
  }

  updateURLSearchParams (searchParams: URLSearchParams, urlSearch: ArticlePageUrlSearch) {
    const { topicId } = urlSearch;

    if (topicId > 0) {
      searchParams.set(topicIdParamName, topicId.toString());
    } else {
      searchParams.delete(topicIdParamName);
    }
  }
}
