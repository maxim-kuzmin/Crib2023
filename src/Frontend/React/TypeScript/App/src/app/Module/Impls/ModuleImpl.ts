import {
  AppNotificationStoreSliceName,
  type AppNotificationStoreHooks,
  type ArticleListStoreHooks,
  type NotificationControlHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks,
  type HttpClient,
  type ApiClient,
  type OperationHandler,
  type ApiRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainRepository,
  type TestService,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainRepository,
  type TopicDomainTreeGetOperationRequestHandler,
  type TopicPageService,
  type ArticlePageService,
  type ApiSetupOptions,
  type SetupOptions,
  type ArticleItemEditViewService,
  type TableControlService,
  type Module,
  type ArticleItemStoreHooks,
  type StoreService,
} from '../../../all';

import { ApiSetupOptionsImpl } from './Data/Api/Setup/ApiSetupOptionsImpl';
import { SetupOptionsImpl } from './Setup/SetupOptionsImpl';
import { HttpClientImpl } from './Http/HttpClientImpl';
import { ApiClientImpl } from './Data/Api/ApiClientImpl';
import { TestServiceImpl } from './Test/TestServiceImpl';
import { StoreServiceImpl } from './Store/StoreServiceImpl';
import { createAppNotificationStoreHooks } from '../../../stores/App/Notification/AppNotificationStore';
import { createNotificationControlHooks } from '../../../controls/Notification';
import { TableControlServiceImpl } from './Controls/Table/TableControlServiceImpl';
import { createArticleItemStoreHooks } from '../../../stores/Article/Item/ArticleItemStore';
import { createArticleListStoreHooks } from '../../../stores/Article/List/ArticleListStore';
import { createTopicItemStoreHooks } from '../../../stores/Topic/Item/TopicItemStore';
import { createTopicTreeStoreHooks } from '../../../stores/Topic/Tree/TopicTreeStore';
import { ArticleDomainRepositoryImpl } from './Domains/Article/ArticleDomainRepositoryImpl';
import { TopicDomainRepositoryImpl } from './Domains/Topic/TopicDomainRepositoryImpl';
import { ArticlePageServiceImpl } from './Pages/Article/ArticlePageServiceImpl';
import { TopicPageServiceImpl } from './Pages/Topic/TopicPageServiceImpl';
import { ArticleItemEditViewServiceImpl } from './Views/Article/Item/Edit/ArticleItemEditViewServiceImpl';
import {
  ArticleDomainItemGetOperationRequestHandlerImpl
} from './Domains/Article/Operations/Item/Get/ArticleDomainItemGetOperationRequestHandlerImpl';
import {
  ArticleDomainListGetOperationRequestHandlerImpl
} from './Domains/Article/Operations/List/Get/ArticleDomainListGetOperationRequestHandlerImpl';
import {
  TopicDomainTreeGetOperationRequestHandlerImpl
} from './Domains/Topic/Operations/Tree/Get/TopicDomainTreeGetOperationRequestHandlerImpl';
import {
  TopicDomainItemGetOperationRequestHandlerImpl
} from './Domains/Topic/Operations/Item/Get/TopicDomainItemGetOperationRequestHandlerImpl';
import {
  TopicDomainListGetOperationRequestHandlerImpl
} from './Domains/Topic/Operations/List/Get/TopicDomainListGetOperationRequestHandlerImpl';
import { OperationHandlerImpl } from './Operation/OperationHandlerImpl';
import { ApiRequestHandlerImpl } from './Data/Api/Request/ApiRequestHandlerImpl';
import { TestArticleDomainRepositoryImpl } from './Test/Domains/Article/TestArticleDomainRepositoryImpl';
import { TestTopicDomainRepositoryImpl } from './Test/Domains/Topic/TestTopicDomainRepositoryImpl';

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
