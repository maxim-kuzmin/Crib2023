import {
  type OperationHandler,
  type HttpClient,
  type SetupOptions,
  type StoreService,
  type TableControlService,
} from '../common';
import {
  type ApiSetupOptions,
  type ApiResponseErrorOptions,
  type ApiClient,
  type ApiRequestHandler,
} from '../data';
import {
  type ArticleDomainItemDeleteOperationRequestHandler,
  type ArticleDomainItemSaveOperationRequestHandler,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainRepository,
  type TopicDomainItemGetOperationRequestHandler,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainRepository,
  type TopicDomainTreeGetOperationRequestHandler,
  type TopicDomainItemSaveOperationRequestHandler,
  type TopicDomainItemDeleteOperationRequestHandler
} from '../domains';
import {
  type ArticlePageService,
  type TopicPageService
} from '../pages';
import {
  type ArticleItemEditViewService,
} from '../views';
import {
  AppNotificationStoreSliceName,
} from './Stores';

import { ApiSetupOptionsImpl } from '../data/Api/Setup/ApiSetupOptionsImpl';
import { SetupOptionsImpl } from '../common/Setup/SetupOptionsImpl';
import { HttpClientImpl } from '../common/Http/HttpClientImpl';
import { ApiClientImpl } from '../data/Api/ApiClientImpl';
import { TestServiceImpl } from './Test/TestServiceImpl';
import { StoreServiceImpl } from '../common/Store/StoreServiceImpl';
import { TableControlServiceImpl } from '../common/Controls/Table/TableControlServiceImpl';

import { ArticleDomainRepositoryImpl } from '../domains/Article/ArticleDomainRepositoryImpl';
import { TopicDomainRepositoryImpl } from '../domains/Topic/TopicDomainRepositoryImpl';
import { ArticlePageServiceImpl } from '../pages/Article/ArticlePageServiceImpl';
import { TopicPageServiceImpl } from '../pages/Topic/TopicPageServiceImpl';
import { ArticleItemEditViewServiceImpl } from '../views/Article/Item/Edit/ArticleItemEditViewServiceImpl';
import {
  ArticleDomainItemDeleteOperationRequestHandlerImpl
} from '../domains/Article/Operations/Item/Delete/ArticleDomainItemDeleteOperationRequestHandlerImpl';
import {
  ArticleDomainItemGetOperationRequestHandlerImpl
} from '../domains/Article/Operations/Item/Get/ArticleDomainItemGetOperationRequestHandlerImpl';
import {
  ArticleDomainItemSaveOperationRequestHandlerImpl
} from '../domains/Article/Operations/Item/Save/ArticleDomainItemSaveOperationRequestHandlerImpl';
import {
  ArticleDomainListGetOperationRequestHandlerImpl
} from '../domains/Article/Operations/List/Get/ArticleDomainListGetOperationRequestHandlerImpl';
import {
  TopicDomainItemDeleteOperationRequestHandlerImpl
} from '../domains/Topic/Operations/Item/Delete/TopicDomainItemDeleteOperationRequestHandlerImpl';
import {
  TopicDomainItemGetOperationRequestHandlerImpl
} from '../domains/Topic/Operations/Item/Get/TopicDomainItemGetOperationRequestHandlerImpl';
import {
  TopicDomainItemSaveOperationRequestHandlerImpl
} from '../domains/Topic/Operations/Item/Save/TopicDomainItemSaveOperationRequestHandlerImpl';
import {
  TopicDomainListGetOperationRequestHandlerImpl
} from '../domains/Topic/Operations/List/Get/TopicDomainListGetOperationRequestHandlerImpl';
import {
  TopicDomainTreeGetOperationRequestHandlerImpl
} from '../domains/Topic/Operations/Tree/Get/TopicDomainTreeGetOperationRequestHandlerImpl';
import { OperationHandlerImpl } from '../common/Operation/OperationHandlerImpl';
import { ApiRequestHandlerImpl } from '../data/Api/Request/ApiRequestHandlerImpl';
import { TestArticleDomainRepositoryImpl } from './Test/Domains/Article/TestArticleDomainRepositoryImpl';
import { TestTopicDomainRepositoryImpl } from './Test/Domains/Topic/TestTopicDomainRepositoryImpl';
import { ApiResponseErrorImpl } from '../data/Api/Response/ApiResponseErrorImpl';
import { type Module } from './Module';
import { type TestService } from './Test';
import { type Hooks } from './Hooks';

interface UseOperationHandlerOptions {
  shouldBeLogged: boolean;
  shouldBeNotified: boolean;
}

export class ModuleImpl implements Module {
  constructor (private readonly hooks: Hooks) {}

  private readonly apiSetupOptions: ApiSetupOptions = new ApiSetupOptionsImpl({
    queryStringKeyForCulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_CULTURE ?? 'lng',
    queryStringKeyForUICulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_UI_CULTURE ?? 'ui-lng',
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

  private readonly tableControlService: TableControlService = new TableControlServiceImpl({
    defaultPageSize: 10
  });

  getTableControlService = () => this.tableControlService;

  createApiResponseError = (options: ApiResponseErrorOptions) => new ApiResponseErrorImpl(options);

  getHooks = () => this.hooks;

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

  useArticleDomainItemDeleteOperationRequestHandler (): ArticleDomainItemDeleteOperationRequestHandler {
    return new ArticleDomainItemDeleteOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: this.getArticleDomainRepository()
    });
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

  useArticleDomainItemSaveOperationRequestHandler (): ArticleDomainItemSaveOperationRequestHandler {
    return new ArticleDomainItemSaveOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
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

  useTopicDomainItemDeleteOperationRequestHandler (): TopicDomainItemDeleteOperationRequestHandler {
    return new TopicDomainItemDeleteOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
      }),
      repository: this.getTopicDomainRepository()
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

  useTopicDomainItemSaveOperationRequestHandler (): TopicDomainItemSaveOperationRequestHandler {
    return new TopicDomainItemSaveOperationRequestHandlerImpl({
      apiRequestHandler: this.useApiRequestHandler({
        shouldBeLogged: true,
        shouldBeNotified: true
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

    const { run } = this.hooks.Stores.App.Notification.useStoreSetActionDispatch(
      AppNotificationStoreSliceName.AppNotificationView,
      {}
    );

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
