import { type ArticlePageUrlSearch, type ArticlePageUrlOptions } from '../../../all';

export interface ArticlePageService {
  readonly createUrl: (options?: ArticlePageUrlOptions) => string;
  readonly getUrlSearch: (searchParams: URLSearchParams) => ArticlePageUrlSearch;
  readonly updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: ArticlePageUrlSearch) => void;
}
