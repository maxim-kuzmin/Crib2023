import { type ArticlePageUrlSearch, type ArticlePageUrlOptions } from '../../../all';

export interface ArticlePageService {
  createUrl: (options?: ArticlePageUrlOptions) => string;
  getUrlSearch: (searchParams: URLSearchParams) => ArticlePageUrlSearch;
  updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: ArticlePageUrlSearch) => void;
}
