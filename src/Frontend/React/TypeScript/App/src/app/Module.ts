import {
  type NotificationControlHooks,
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
  type AppNotificationViewHooks,
  type ArticleItemEditViewService,
  type ArticleItemViewHooks,
  type ArticleTableViewHooks,
  type TopicItemViewHooks,
  type TopicTreeViewHooks
} from '../views';
import {
  type AppNotificationStoreHooks,
  type ArticleItemStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks
} from './Stores';
import { type TestService } from './Test';

export interface Module {
  readonly createApiResponseError: (responseStatus: number, options?: ApiResponseErrorOptions) => ApiResponseError;
  readonly getNotificationControlHooks: () => NotificationControlHooks;
  readonly getTableControlService: () => TableControlService;
  readonly getAppNotificationStoreHooks: () => AppNotificationStoreHooks;
  readonly getAppNotificationViewHooks: () => AppNotificationViewHooks;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticleItemStoreHooks: () => ArticleItemStoreHooks;
  readonly getArticleListStoreHooks: () => ArticleListStoreHooks;
  readonly getArticlePageService: () => ArticlePageService;
  readonly getArticleItemViewHooks: () => ArticleItemViewHooks;
  readonly getArticleItemEditViewService: () => ArticleItemEditViewService;
  readonly getArticleTableViewHooks: () => ArticleTableViewHooks;
  readonly getTestService: () => TestService;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
  readonly getTopicItemStoreHooks: () => TopicItemStoreHooks;
  readonly getTopicItemViewHooks: () => TopicItemViewHooks;
  readonly getTopicTreeStoreHooks: () => TopicTreeStoreHooks;
  readonly getTopicTreeViewHooks: () => TopicTreeViewHooks;
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
