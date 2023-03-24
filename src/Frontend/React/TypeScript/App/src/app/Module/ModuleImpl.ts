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
} from '../../all';

export class ModuleImpl implements Module {
  private readonly apiSetupOptions = createApiSetupOptions();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly httpClient: HttpClient = new HttpClientImpl();
  private readonly notificationControlService = createNotificationControlService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly setupOptions = createSetupOptions();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicPathStoreService = createTopicPathStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  private readonly apiClient: ApiClient = new ApiClientImpl(this.apiSetupOptions, this.httpClient);

  private readonly articleDomainRepository: ArticleDomainRepository = this.setupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl(this.apiClient);

  getNotificationControlService = () => this.notificationControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicPathStoreService = () => this.topicPathStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  getArticleDomainRepository (): ArticleDomainRepository {
    return this.articleDomainRepository;
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

  private useOperationHandler (): OperationHandler {
    const service = this.getAppNotificationStoreService();

    const { run } = service.useDispatchToSet();

    return new OperationHandlerImpl(run);
  }

  private useApiRequestHandler (): ApiRequestHandler {
    return new ApiRequestHandlerImpl(this.useOperationHandler());
  }
}
