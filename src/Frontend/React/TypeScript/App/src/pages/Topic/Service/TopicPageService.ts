import { type URLSearchParams } from 'url';
import { type TopicPageUrlSearch, type TopicPageUrlOptions } from '../../../all';

export interface TopicPageService {
  readonly createUrl: (options?: TopicPageUrlOptions) => string;
  readonly getUrlSearch: (searchParams: URLSearchParams) => TopicPageUrlSearch;
  lastUrl?: string;
  readonly updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) => void;
}
