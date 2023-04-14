import {
  type AppNotificationStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks,
  type NotificationControlHooks,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainRepository,
  type TestService,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainRepository,
  type TopicDomainTreeGetOperationRequestHandler,
  type TableControlService,
  type TopicPageService,
  type ArticlePageService,
  type ArticleItemEditViewService,
  type ArticleItemStoreHooks,
  type StoreService,
  type ApiResponseError,
  type ApiResponseErrorOptions,
  type AppNotificationViewHooks,
  type TopicTreeViewHooks,
  type ArticleItemViewHooks,
  type ArticleTableViewHooks,
  type TopicItemViewHooks,
} from '../all';

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
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useArticleDomainListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
  readonly useTopicDomainItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useTopicDomainListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTopicDomainTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
}
