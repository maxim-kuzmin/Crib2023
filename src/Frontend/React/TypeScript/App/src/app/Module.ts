import {
  type StoreService,
  type TableControlService
} from '../common';
import {
  type ApiResponseError,
  type ApiResponseErrorOptions
} from '../data';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemSaveOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainRepository,
  type TopicDomainItemDeleteOperationRequestHandler,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainItemSaveOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainRepository,
  type TopicDomainTreeGetOperationRequestHandler,

} from '../domains';
import {
  type ArticlePageService,
  type TopicPageService
} from '../pages';
import {
  type ArticleItemEditViewService,
} from '../views';
import { type Hooks } from './Hooks';
import { type TestService } from './Test';

export interface Module {
  readonly createApiResponseError: (options: ApiResponseErrorOptions) => ApiResponseError;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticlePageService: () => ArticlePageService;
  readonly getArticleItemEditViewService: () => ArticleItemEditViewService;
  readonly getHooks: () => Hooks;
  readonly getTableControlService: () => TableControlService;
  readonly getTestService: () => TestService;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
  readonly getTopicPageService: () => TopicPageService;
  readonly getStoreService: () => StoreService;
  readonly useArticleDomainItemDeleteOperationRequestHandler: () => ArticleDomainItemDeleteOperationRequestHandler;
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useArticleDomainItemSaveOperationRequestHandler: () => ArticleDomainItemSaveOperationRequestHandler;
  readonly useArticleDomainListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
  readonly useTopicDomainItemDeleteOperationRequestHandler: () => TopicDomainItemDeleteOperationRequestHandler;
  readonly useTopicDomainItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useTopicDomainItemSaveOperationRequestHandler: () => TopicDomainItemSaveOperationRequestHandler;
  readonly useTopicDomainListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTopicDomainTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
}
