import {
  type AppNotificationStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks,
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
  readonly getAppNotificationStoreHooks: () => AppNotificationStoreHooks;
  readonly getArticleDomainRepository: () => ArticleDomainRepository;
  readonly getArticleItemStoreHooks: () => ArticleItemStoreHooks;
  readonly getArticleListStoreHooks: () => ArticleListStoreHooks;
  readonly getArticlePageService: () => ArticlePageService;
  readonly getArticleItemEditViewService: () => ArticleItemEditViewService;
  readonly getTestService: () => TestService;
  readonly getTopicItemStoreHooks: () => TopicItemStoreHooks;
  readonly getTopicTreeStoreHooks: () => TopicTreeStoreHooks;
  readonly getTopicPageService: () => TopicPageService;
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
  readonly useArticleDomainListGetOperationRequestHandler: () => ArticleDomainListGetOperationRequestHandler;
  readonly useTopicDomainItemGetOperationRequestHandler: () => TopicDomainItemGetOperationRequestHandler;
  readonly useTopicDomainListGetOperationRequestHandler: () => TopicDomainListGetOperationRequestHandler;
  readonly useTopicDomainTreeGetOperationRequestHandler: () => TopicDomainTreeGetOperationRequestHandler;
  readonly getTopicDomainRepository: () => TopicDomainRepository;
}
