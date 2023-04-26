import {
  type StoreService,
  type TableControlService
} from '../common';
import {
  type ApiResponseError,
  type ApiResponseErrorOptions
} from '../data';
import {
  type ArticleDomainRepository,
  type TopicDomainRepository,
} from '../domains';
import {
  type ArticlePageService,
  type TopicPageService
} from '../pages';
import {
  type ArticleItemEditViewService,
} from '../views';
import { type TestService } from './Test';

export interface Module {
  readonly createApiResponseError: (options: ApiResponseErrorOptions) => ApiResponseError;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticlePageService: () => ArticlePageService;
  readonly getArticleItemEditViewService: () => ArticleItemEditViewService;
  readonly getTableControlService: () => TableControlService;
  readonly getTestService: () => TestService;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
  readonly getTopicPageService: () => TopicPageService;
  readonly getStoreService: () => StoreService;
}
