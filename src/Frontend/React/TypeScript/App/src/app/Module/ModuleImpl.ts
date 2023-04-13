import {
  AppNotificationStoreSliceName,
  type AppNotificationStoreHooks,
  createAppNotificationStoreHooks,
  type ArticleListStoreHooks,
  createArticleListStoreHooks,
  type NotificationControlHooks,
  createNotificationControlHooks,
  type TopicItemStoreHooks,
  createTopicItemStoreHooks,
  type TopicTreeStoreHooks,
  createTopicTreeStoreHooks,
  type HttpClient,
  HttpClientImpl,
  type ApiClient,
  ApiClientImpl,
  type OperationHandler,
  OperationHandlerImpl,
  type ApiRequestHandler,
  ApiRequestHandlerImpl,
  type ArticleDomainItemGetOperationRequestHandler,
  ArticleDomainItemGetOperationRequestHandlerImpl,
  type ArticleDomainListGetOperationRequestHandler,
  ArticleDomainListGetOperationRequestHandlerImpl,
  type ArticleDomainRepository,
  ArticleDomainRepositoryImpl,
  TestArticleDomainRepositoryImpl,
  type TestService,
  TestServiceImpl,
  type TopicDomainItemGetOperationRequestHandler,
  TopicDomainItemGetOperationRequestHandlerImpl,
  type TopicDomainListGetOperationRequestHandler,
  TopicDomainListGetOperationRequestHandlerImpl,
  type TopicDomainRepository,
  TopicDomainRepositoryImpl,
  TestTopicDomainRepositoryImpl,
  type TopicDomainTreeGetOperationRequestHandler,
  TopicDomainTreeGetOperationRequestHandlerImpl,
  type TopicPageService,
  TopicPageServiceImpl,
  type ArticlePageService,
  ArticlePageServiceImpl,
  type ApiSetupOptions,
  ApiSetupOptionsImpl,
  type SetupOptions,
  SetupOptionsImpl,
  type ArticleItemEditViewService,
  ArticleItemEditViewServiceImpl,
  type TableControlService,
  TableControlServiceImpl,
  type Module,
  type ArticleItemStoreHooks,
  createArticleItemStoreHooks,
  type StoreService,
  StoreServiceImpl
} from '../../all';

interface UseOperationHandlerOptions {
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}

export class ModuleImpl implements Module {
  private readonly apiSetupOptions: ApiSetupOptions = new ApiSetupOptionsImpl({
    url: process.env.REACT_APP_API_URL ?? ''
  });

  private readonly setupOptions: SetupOptions = new SetupOptionsImpl({
    isTestModeEnabled: process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true'
  });

  private readonly httpClient: HttpClient = new HttpClientImpl();

  private readonly apiClient: ApiClient = new ApiClientImpl({
    apiSetupOptions: this.apiSetupOptions,
    httpClient: this.httpClient
  });

  private readonly testService: TestService = new TestServiceImpl();
  getTestService = () => this.testService;

  private readonly storeService: StoreService = new StoreServiceImpl();
  getStoreService = () => this.storeService;

  private readonly appNotificationStoreHooks: AppNotificationStoreHooks = createAppNotificationStoreHooks();
  getAppNotificationStoreHooks = () => this.appNotificationStoreHooks;

  private readonly notificationControlHooks: NotificationControlHooks = createNotificationControlHooks();
  getNotificationControlHooks = () => this.notificationControlHooks;

  private readonly tableControlService: TableControlService = new TableControlServiceImpl({
    defaultPageSize: 10
  });

  getTableControlService = () => this.tableControlService;

  private readonly articleItemStoreHooks: ArticleItemStoreHooks = createArticleItemStoreHooks();
  getArticleItemStoreHooks = () => this.articleItemStoreHooks;

  private readonly articleListStoreHooks: ArticleListStoreHooks = createArticleListStoreHooks();
  getArticleListStoreHooks = () => this.articleListStoreHooks;

  private readonly topicItemStoreHooks: TopicItemStoreHooks = createTopicItemStoreHooks();
  getTopicItemStoreHooks = () => this.topicItemStoreHooks;

  private readonly topicTreeStoreHooks: TopicTreeStoreHooks = createTopicTreeStoreHooks();
  getTopicTreeStoreHooks = () => this.topicTreeStoreHooks;

  private readonly articleDomainRepository: ArticleDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl({
        apiClient: this.apiClient
      });

  getArticleDomainRepository = () => this.articleDomainRepository;

  private readonly topicDomainRepository: TopicDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl()
    : new TopicDomainRepositoryImpl({
        apiClient: this.apiClient
      });

  getTopicDomainRepository = () => this.topicDomainRepository;

  private readonly articlePageService: ArticlePageService = new ArticlePageServiceImpl();

  getArticlePageService (): ArticlePageService {
    return this.articlePageService;
  }

  private readonly topicPageService: TopicPageService = new TopicPageServiceImpl({
    tableControlService: this.getTableControlService()
  });

  getTopicPageService (): TopicPageService {
    return this.topicPageService;
  }

  private readonly articleItemEditViewService: ArticleItemEditViewService = new ArticleItemEditViewServiceImpl();

  getArticleItemEditViewService (): ArticleItemEditViewService {
    return this.articleItemEditViewService;
  }

  useArticleDomainItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return new ArticleDomainItemGetOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: this.getArticleDomainRepository()
    });
  }

  useArticleDomainListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return new ArticleDomainListGetOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: this.getArticleDomainRepository()
    });
  }

  useTopicDomainItemGetOperationRequestHandler (): TopicDomainItemGetOperationRequestHandler {
    return new TopicDomainItemGetOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: this.getTopicDomainRepository()
    });
  }

  useTopicDomainListGetOperationRequestHandler (): TopicDomainListGetOperationRequestHandler {
    return new TopicDomainListGetOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: this.getTopicDomainRepository()
    });
  }

  useTopicDomainTreeGetOperationRequestHandler (): TopicDomainTreeGetOperationRequestHandler {
    return new TopicDomainTreeGetOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: false
      }),
      repository: this.getTopicDomainRepository()
    });
  }

  private useOperationHandler (options: UseOperationHandlerOptions): OperationHandler {
    const { shouldBeLogged, shouldBeNotified } = options;

    const { run } = this.getAppNotificationStoreHooks().useDispatchToSet({
      sliceName: AppNotificationStoreSliceName.Global
    });

    return new OperationHandlerImpl({
      functionToSetNotification: run,
      shouldBeLogged,
      shouldBeNotified
    });
  }

  private useApiRequestHandler (options: UseOperationHandlerOptions): ApiRequestHandler {
    return new ApiRequestHandlerImpl({
      operationHandler: this.useOperationHandler(options)
    });
  }
}

const module = new ModuleImpl();

export function getModule (): Module {
  return module;
}
