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
  type OperationHandler,
  OperationHandlerImpl,
  createApiConfig,
  type ApiConfig
} from '../all';

interface Module {
  readonly getApiClient: <TData extends null>() => ApiClient<TData>;
  readonly getApiConfig: () => ApiConfig;
  readonly getHttpClient: () => HttpClient;
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicPathStoreService: () => TopicPathStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly useOperationHandler: () => OperationHandler;
}

class ModuleImpl implements Module {
  private readonly apiConfig = createApiConfig();
  private readonly httpClient = new HttpClientImpl();
  private readonly notificationControlService = createNotificationControlService();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicPathStoreService = createTopicPathStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  getApiConfig = () => this.apiConfig;
  getHttpClient = () => this.httpClient;
  getNotificationControlService = () => this.notificationControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicPathStoreService = () => this.topicPathStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  getApiClient<TData extends null>() {
    return new ApiClientImpl<TData>(this.apiConfig, this.httpClient);
  }

  useOperationHandler () {
    const service = this.getAppNotificationStoreService();

    const { run } = service.useDispatchToSet();

    return new OperationHandlerImpl(run);
  }
}

const module: Module = new ModuleImpl();

export function getModule (): Module {
  return module;
}
