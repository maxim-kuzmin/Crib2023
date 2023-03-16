import {
  type ApiClient,
  type ApiRequestHandler,
  createApiClient,
  ApiRequestHandlerImpl
} from '../common';
import { createNotificationControlService, type NotificationControlService } from '../controls';
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
  createTopicTreeStoreService
} from '../stores';

interface Module {
  readonly getApiClient: () => ApiClient;
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicPathStoreService: () => TopicPathStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly useApiRequestHandler: (operationName: string) => ApiRequestHandler;
}

class ModuleImpl implements Module {
  private readonly apiClient = createApiClient(process.env.REACT_APP_API_URL ?? '/api');
  private readonly notificationControlService = createNotificationControlService();
  private readonly appNotificationStoreService = creareAppNotificationStoreService();
  private readonly articleItemStoreService = createArticleItemStoreService();
  private readonly articleListStoreService = createArticleListStoreService();
  private readonly topicItemStoreService = createTopicItemStoreService();
  private readonly topicPathStoreService = createTopicPathStoreService();
  private readonly topicTreeStoreService = createTopicTreeStoreService();

  getApiClient = () => this.apiClient;
  getNotificationControlService = () => this.notificationControlService;
  getAppNotificationStoreService = () => this.appNotificationStoreService;
  getArticleItemStoreService = () => this.articleItemStoreService;
  getArticleListStoreService = () => this.articleListStoreService;
  getTopicItemStoreService = () => this.topicItemStoreService;
  getTopicPathStoreService = () => this.topicPathStoreService;
  getTopicTreeStoreService = () => this.topicTreeStoreService;

  useApiRequestHandler (operationName: string) {
    const service = this.getAppNotificationStoreService();

    const { run } = service.useDispatchToSet();

    return new ApiRequestHandlerImpl(operationName, run);
  }
}

const module: Module = new ModuleImpl();

export function getModule (): Module {
  return module;
}
