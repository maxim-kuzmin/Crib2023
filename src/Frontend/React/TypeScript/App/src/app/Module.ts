import {
  type ArticleItemStoreService,
  type AppNotificationStoreService,
  type ArticleListStoreService,
  type TopicItemStoreService,
  type TopicPathStoreService,
  type TopicTreeStoreService,
  creareAppNotificationStoreService,
  createArticleItemStoreService,
  createArticleListStoreService,
  createTopicItemStoreService,
  createTopicPathStoreService,
  createTopicTreeStoreService,
  type HttpClient,
  type NotificationControlService,
  HttpClientImpl,
  createNotificationControlService,
  type ApiClient,
  ApiClientImpl,
  OperationHandlerImpl,
  createApiConfig,
  type ApiConfig,
  ApiRequestHandlerImpl,
  ArticleDomainItemGetOperationRequestHandlerImpl,
  type ArticleDomainItemGetOperationRequestHandler,
  type ApiRequestHandler,
  type OperationHandler,
  type ArticleDomainListGetOperationRequestHandler,
  ArticleDomainListGetOperationRequestHandlerImpl
} from '../all';

interface Module {
  readonly getApiClient: () => ApiClient;
  readonly getApiConfig: () => ApiConfig;
  readonly getHttpClient: () => HttpClient;
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicPathStoreService: () => TopicPathStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly useArticleDomainItemGetOperationRequestHandler: () => ArticleDomainItemGetOperationRequestHandler;
}

class ModuleImpl implements Module {
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

  useArticleDomainItemGetOperationRequestHandler (): ArticleDomainItemGetOperationRequestHandler {
    return new ArticleDomainItemGetOperationRequestHandlerImpl(
      this.getApiClient(),
      this.useApiRequestHandler());
  }

  useArticleDomainListGetOperationRequestHandler (): ArticleDomainListGetOperationRequestHandler {
    return new ArticleDomainListGetOperationRequestHandlerImpl(
      this.getApiClient(),
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

const module: Module = new ModuleImpl();

export function getModule (): Module {
  return module;
}
