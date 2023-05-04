import { ArticleItemViewMode } from '../../views/Article/Item/ArticleItemViewMode';
import { type ArticlePageUrlOptions, type ArticlePageUrlSearch } from './Url';

export interface ArticlePageService {
  readonly createUrl: (options?: ArticlePageUrlOptions) => string;
  readonly getUrlSearch: (searchParams: URLSearchParams) => ArticlePageUrlSearch;
  readonly updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: ArticlePageUrlSearch) => void;
}

const paramNameForTopicId = 'topicId';

class Implementation implements ArticlePageService {
  createUrl (options?: ArticlePageUrlOptions) {
    let result = '/article';

    let articleId = 0;

    let search: ArticlePageUrlSearch = {
      topicId: 0
    };

    let mode: ArticleItemViewMode = ArticleItemViewMode.Display;

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

      if (mode === ArticleItemViewMode.Edit) {
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

export function createArticlePageService (): ArticlePageService {
  return new Implementation();
}
