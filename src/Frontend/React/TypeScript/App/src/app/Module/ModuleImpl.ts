import {
  creareAppNotificationStoreService,
  createArticleItemStoreService,
  createArticleListStoreService,
  createTopicItemStoreService,
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
  TestTopicDomainRepositoryImpl,
  type TopicDomainTreeGetOperationRequestHandler,
  TopicDomainTreeGetOperationRequestHandlerImpl,
  createTableControlService,
  type TopicPageService,
  TopicPageServiceImpl
} from '../../all';

interface UseOperationHandlerOptions {
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}

export class ModuleImpl implements Module {
  private readonly apiSetupOptions = createApiSetupOptions();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly httpClient: HttpClient = new HttpClientImpl();
  private readonly notificationControlService = createNotificationControlService();
  private readonly tableControlService = createTableControlService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly setupOptions = createSetupOptions();
  private readonly testService = new TestServiceImpl();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  private readonly apiClient: ApiClient = new ApiClientImpl(this.apiSetupOptions, this.httpClient);

  private readonly articleDomainRepository: ArticleDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl(this.apiClient);

  private readonly topicDomainRepository: TopicDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl()
    : new TopicDomainRepositoryImpl(this.apiClient);

  getNotificationControlService = () => this.notificationControlService;
  getTableControlService = () => this.tableControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTestService = () => this.testService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  getArticleDomainRepository (): ArticleDomainRepository {
    return this.articleDomainRepository;
  }

  getTopicDomainRepository (): TopicDomainRepository {
    return this.topicDomainRepository;
  }

  private readonly topicPageService: TopicPageService = new TopicPageServiceImpl(this.getTableControlService());

  getTopicPageService (): TopicPageService {
    return this.topicPageService;
  }

  useArticleDomainItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return new ArticleDomainItemGetOperationRequestHandlerImpl(
      this.getArticleDomainRepository(),
      this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      })
    );
  }

  useArticleDomainListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return new ArticleDomainListGetOperationRequestHandlerImpl(
      this.getArticleDomainRepository(),
      this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      })
    );
  }

  useTopicDomainItemGetOperationRequestHandler (): TopicDomainItemGetOperationRequestHandler {
    return new TopicDomainItemGetOperationRequestHandlerImpl(
      this.getTopicDomainRepository(),
      this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      })
    );
  }

  useTopicDomainListGetOperationRequestHandler (): TopicDomainListGetOperationRequestHandler {
    return new TopicDomainListGetOperationRequestHandlerImpl(
      this.getTopicDomainRepository(),
      this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      })
    );
  }

  useTopicDomainTreeGetOperationRequestHandler (): TopicDomainTreeGetOperationRequestHandler {
    return new TopicDomainTreeGetOperationRequestHandlerImpl(
      this.getTopicDomainRepository(),
      this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      })
    );
  }

  private useOperationHandler (options: UseOperationHandlerOptions): OperationHandler {
    const { shouldBeLogged, shouldBeNotified } = options;

    const service = this.getAppNotificationStoreService();

    const { run } = service.useDispatchToSet();

    return new OperationHandlerImpl({
      functionToSetNotification: run,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  private useApiRequestHandler (options: UseOperationHandlerOptions): ApiRequestHandler {
    return new ApiRequestHandlerImpl(this.useOperationHandler(options));
  }
}
