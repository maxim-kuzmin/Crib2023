import {
  type AppNotificationStoreService,
  type ArticleListStoreHooks,
  type TopicItemStoreService,
  type TopicTreeStoreService,
  type NotificationControlService,
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
} from '../../all';

export interface Module {
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getTableControlService: () => TableControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticleItemStoreHooks: () => ArticleItemStoreHooks;
  readonly getArticleListStoreHooks: () => ArticleListStoreHooks;
  readonly getArticlePageService: () => ArticlePageService;
  readonly getArticleItemEditViewService: () => ArticleItemEditViewService;
  readonly getTestService: () => TestService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly getTopicPageService: () => TopicPageService;
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useArticleDomainListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
  readonly useTopicDomainItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useTopicDomainListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTopicDomainTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
}
