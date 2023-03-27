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
  type TopicDomainRepository
} from '../../all';

export interface Module {
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTestService: () => TestService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useArticleDomainListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
  readonly useTopicDomainItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useTopicDomainListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
}
