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
  ApiClientImpl
} from '../all';

interface Module {
  readonly getHttpClient: () => HttpClient;
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicPathStoreService: () => TopicPathStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly useApiRequestHandler: <TData extends null>(operationName: string) => ApiClient<TData>;
}

class ModuleImpl implements Module {
  private readonly httpClient = new HttpClientImpl(process.env.REACT_APP_API_URL ?? '/api');
  private readonly notificationControlService = createNotificationControlService();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicPathStoreService = createTopicPathStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  getHttpClient = () => this.httpClient;
  getNotificationControlService = () => this.notificationControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicPathStoreService = () => this.topicPathStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  useApiRequestHandler<TData extends null> (operationName: string) {
    const service = this.getAppNotificationStoreService();

    const { run } = service.useDispatchToSet();

    return new ApiClientImpl<TData>(operationName, this.getHttpClient(), run);
  }
}

const module: Module = new ModuleImpl();

export function getModule (): Module {
  return module;
}
