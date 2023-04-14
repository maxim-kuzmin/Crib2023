import { ArticlePageMode } from './ArticlePageMode';
import { type ArticlePageService } from './ArticlePageService';
import { type ArticlePageUrlOptions, type ArticlePageUrlSearch } from './Url';

const paramNameForTopicId = 'topicId';

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
      topicId: Number(searchParams.get(paramNameForTopicId) ?? 0)
    };
  }

  updateURLSearchParams (searchParams: URLSearchParams, urlSearch: ArticlePageUrlSearch) {
    const { topicId } = urlSearch;

    if (topicId > 0) {
      searchParams.set(paramNameForTopicId, topicId.toString());
    } else {
      searchParams.delete(paramNameForTopicId);
    }
  }
}
