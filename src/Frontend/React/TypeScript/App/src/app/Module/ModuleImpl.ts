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
  ApiRequestHandlerImpl,
  ArticleDomainItemGetOperationRequestHandlerImpl,
  type ArticleDomainItemGetOperationRequestHandler,
  type ApiRequestHandler,
  type OperationHandler,
  type ArticleDomainListGetOperationRequestHandler,
  ArticleDomainListGetOperationRequestHandlerImpl,
  type ArticleDomainRepository,
  type Module,
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
  TopicPageServiceImpl,
  type ArticlePageService,
  ArticlePageServiceImpl,
  ApiSetupOptionsImpl,
  SetupOptionsImpl
} from '../../all';

interface UseOperationHandlerOptions {
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}

export class ModuleImpl implements Module {
  private readonly apiSetupOptions = new ApiSetupOptionsImpl(process.env.REACT_APP_API_URL ?? '');
  private readonly setupOptions = new SetupOptionsImpl(process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true');

  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly httpClient: HttpClient = new HttpClientImpl();
  private readonly notificationControlService = createNotificationControlService();
  private readonly tableControlService = createTableControlService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
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

  private readonly articlePageService: ArticlePageService = new ArticlePageServiceImpl();

  getArticlePageService (): ArticlePageService {
    return this.articlePageService;
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
