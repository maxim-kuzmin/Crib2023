import { type URLSearchParams } from 'url';
import { type TopicPageUrlSearch, type TopicPageUrlOptions } from '../../../all';

export interface TopicPageService {
  createUrl: (options?: TopicPageUrlOptions) => string;
  getUrlSearch: (searchParams: URLSearchParams) => TopicPageUrlSearch;
  updateURLSearchParams: (searchParams: URLSearchParams, urlSearch: TopicPageUrlSearch) => void;
}
