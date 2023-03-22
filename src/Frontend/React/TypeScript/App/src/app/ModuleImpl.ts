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
  createApiConfig,
  ApiRequestHandlerImpl,
  ArticleDomainItemGetOperationRequestHandlerImpl,
  type ArticleDomainItemGetOperationRequestHandler,
  type ApiRequestHandler,
  type OperationHandler,
  type ArticleDomainListGetOperationRequestHandler,
  ArticleDomainListGetOperationRequestHandlerImpl,
  type ArticleDomainRepository,
  ArticleDomainRepositoryImpl,
  type Module,
  createConfig,
  TestArticleDomainRepositoryImpl
} from '../all';

export class ModuleImpl implements Module {
  private readonly config = createConfig();
  private readonly apiConfig = createApiConfig();
  private readonly httpClient: HttpClient = new HttpClientImpl();
  private readonly apiClient: ApiClient = new ApiClientImpl(this.apiConfig, this.httpClient);
  private readonly notificationControlService = createNotificationControlService();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicPathStoreService = createTopicPathStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  getApiConfig = () => this.apiConfig;
  getApiClient = () => this.apiClient;
  getHttpClient = () => this.httpClient;
  getNotificationControlService = () => this.notificationControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicPathStoreService = () => this.topicPathStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  getArticleDomainRepository (): ArticleDomainRepository {
    return this.config.isTestModeEnabled
      ? new TestArticleDomainRepositoryImpl()
      : new ArticleDomainRepositoryImpl(this.getApiClient());
  }

  useArticleDomainItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return new ArticleDomainItemGetOperationRequestHandlerImpl(
      this.getArticleDomainRepository(),
      this.useApiRequestHandler());
  }

  useArticleDomainListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return new ArticleDomainListGetOperationRequestHandlerImpl(
      this.getArticleDomainRepository(),
      this.useApiRequestHandler());
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
