import { type ArticlePageUrlOptions, type ArticlePageUrlSearch } from './Url';

export interface ArticlePageService {
  readonly createUrl: (options?: ArticlePageUrlOptions) => string;
  readonly getUrlSearch: (searchParams: URLSearchParams) => ArticlePageUrlSearch;
  readonly updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: ArticlePageUrlSearch) => void;
}
