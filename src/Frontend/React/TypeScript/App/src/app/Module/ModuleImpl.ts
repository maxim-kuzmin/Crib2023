import {
  creareAppNotificationStoreService,
  createArticleItemStoreService,
  createArticleListStoreService,
  createTopicItemStoreService,
  createTopicPathStoreService,
  createTopicTreeStoreService,
  type HttpClient,
  HttpClientImpl,
  createNotificationControlService,
  type ApiClient,
  ApiClientImpl,
  OperationHandlerImpl,
  createApiSetupOptions,
  ApiRequestHandlerImpl,
  ArticleDomainItemGetOperationRequestHandlerImpl,
  type ArticleDomainItemGetOperationRequestHandler,
  type ApiRequestHandler,
  type OperationHandler,
  type ArticleDomainListGetOperationRequestHandler,
  ArticleDomainListGetOperationRequestHandlerImpl,
  type ArticleDomainRepository,
  type Module,
  createSetupOptions,
  ArticleDomainRepositoryImpl,
  TestArticleDomainRepositoryImpl,
  TestServiceImpl,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  TopicDomainItemGetOperationRequestHandlerImpl,
  TopicDomainListGetOperationRequestHandlerImpl,
  type TopicDomainRepository,
  TopicDomainRepositoryImpl,
  TestTopicDomainRepositoryImpl
} from '../../all';

export class ModuleImpl implements Module {
  private readonly apiSetupOptions = createApiSetupOptions();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly httpClient: HttpClient = new HttpClientImpl();
  private readonly notificationControlService = createNotificationControlService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly setupOptions = createSetupOptions();
  private readonly testService = new TestServiceImpl();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicPathStoreService = createTopicPathStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  private readonly apiClient: ApiClient = new ApiClientImpl(this.apiSetupOptions, this.httpClient);

  private readonly articleDomainRepository: ArticleDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl(this.apiClient);

  private readonly topicDomainRepository: TopicDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl()
    : new TopicDomainRepositoryImpl(this.apiClient);

  getNotificationControlService = () => this.notificationControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTestService = () => this.testService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicPathStoreService = () => this.topicPathStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  getArticleDomainRepository (): ArticleDomainRepository {
    return this.articleDomainRepository;
  }

  getTopicDomainRepository (): TopicDomainRepository {
    return this.topicDomainRepository;
  }

  useArticleDomainItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return new ArticleDomainItemGetOperationRequestHandlerImpl(
      this.getArticleDomainRepository(),
      this.useApiRequestHandler()
    );
  }

  useArticleDomainListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return new ArticleDomainListGetOperationRequestHandlerImpl(
      this.getArticleDomainRepository(),
      this.useApiRequestHandler()
    );
  }

  useTopicDomainItemGetOperationRequestHandler (): TopicDomainItemGetOperationRequestHandler {
    return new TopicDomainItemGetOperationRequestHandlerImpl(
      this.getTopicDomainRepository(),
      this.useApiRequestHandler()
    );
  }

  useTopicDomainListGetOperationRequestHandler (): TopicDomainListGetOperationRequestHandler {
    return new TopicDomainListGetOperationRequestHandlerImpl(
      this.getTopicDomainRepository(),
      this.useApiRequestHandler()
    );
  }

  private useOperationHandler (): OperationHandler {
    const service = this.getAppNotificationStoreService();

    const { run } = service.useDispatchToSet();

    return new OperationHandlerImpl(run);
  }

  private useApiRequestHandler (): ApiRequestHandler {
    return new ApiRequestHandlerImpl(this.useOperationHandler());
  }
}
