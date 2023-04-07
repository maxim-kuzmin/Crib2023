import {
  type ArticleItemStoreService,
  type AppNotificationStoreService,
  type ArticleListStoreService,
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
  type ArticlePageService
} from '../../all';

export interface Module {
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getTableControlService: () => TableControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getArticlePageService: () => ArticlePageService;
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
