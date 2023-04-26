import {
  type StoreService,
  type TableControlService
} from '../common';
import {
  BreadcrumbControl,
  ButtonControl,
  CardControl,
  FormControl,
  LayoutControl,
  SpinnerControl,
  SelectControl,
  TableControl,
  TextAreaControl,
  TextInputControl,
  TreeControl,
} from '../controls';
import {
  type ApiResponseError,
  type ApiResponseErrorOptions,
  type ApiSetupOptions
} from '../data';
import {
  type ArticleDomainRepository,
  type TopicDomainRepository
} from '../domains';
import {
  type ArticlePageService,
  type TopicPageService
} from '../pages';
import {
  type ArticleItemEditViewService
} from '../views';
import { type TestService } from './Test';
import {
  type App,
  type Controls,
  type Components,
  type Hooks,
  type Module,
} from '.';

import { createOperationHooks } from '../common/Operation/OperationFactory';

import { createConfirmControlComponent, createConfirmControlHooks } from '../controls/Confirm/ConfirmControlFactory';
import { createNotificationControlHooks } from '../controls/Notification/NotificationControlFactory';
import { createTableControlHooks } from '../controls/Table/TableControlFactory';

import { createApiRequestHooks } from '../data/Api/Request/ApiRequestFactory';
import { createApiResponseHooks } from '../data/Api/Response/ApiResponseFactory';

import { createArticleDomainHooks } from '../domains/Article/ArticleDomainFactory';
import { createTopicDomainHooks } from '../domains/Topic/TopicDomainFactory';

import { createAppNotificationStoreHooks } from '../stores/App/Notification/AppNotificationStoreFactory';
import { createArticleItemStoreHooks } from '../stores/Article/Item/ArticleItemStoreFactory';
import { createArticleListStoreHooks } from '../stores/Article/List/ArticleListStoreFactory';
import { createTopicItemStoreHooks } from '../stores/Topic/Item/TopicItemStoreFactory';
import { createTopicTreeStoreHooks } from '../stores/Topic/Tree/TopicTreeStoreFactory';

import { createAppNotificationViewHooks } from '../views/App/Notification/AppNotificationViewFactory';
import { createArticleItemViewHooks } from '../views/Article/Item/ArticleItemViewFactory';
import { createArticleItemEditViewHooks } from '../views/Article/Item/Edit/ArticleItemEditViewFactory';
import { createArticleTableViewHooks } from '../views/Article/Table/ArticleTableViewFactory';
import { createTopicItemViewHooks } from '../views/Topic/Item/TopicItemViewFactory';
import { createTopicPathViewHooks } from '../views/Topic/Path/TopicPathViewFactory';
import { createTopicTreeViewHooks } from '../views/Topic/Tree/TopicTreeViewFactory';

import { createLocalizationHooks } from './Localization/LocalizationFactory';

import { TableControlServiceImpl } from '../common/Controls/Table/TableControlServiceImpl';
import { HttpClientImpl } from '../common/Http/HttpClientImpl';
import { SetupOptionsImpl } from '../common/Setup/SetupOptionsImpl';
import { StoreServiceImpl } from '../common/Store/StoreServiceImpl';

import { ApiResponseErrorImpl } from '../data/Api/Response/ApiResponseErrorImpl';
import { ApiSetupOptionsImpl } from '../data/Api/Setup/ApiSetupOptionsImpl';
import { ApiClientImpl } from '../data/Api/ApiClientImpl';

import { ArticleDomainRepositoryImpl } from '../domains/Article/ArticleDomainRepositoryImpl';
import { TopicDomainRepositoryImpl } from '../domains/Topic/TopicDomainRepositoryImpl';

import { ArticlePageServiceImpl } from '../pages/Article/ArticlePageServiceImpl';
import { TopicPageServiceImpl } from '../pages/Topic/TopicPageServiceImpl';

import { ArticleItemEditViewServiceImpl } from '../views/Article/Item/Edit/ArticleItemEditViewServiceImpl';

import { TestArticleDomainRepositoryImpl } from './Test/Domains/Article/TestArticleDomainRepositoryImpl';
import { TestTopicDomainRepositoryImpl } from './Test/Domains/Topic/TestTopicDomainRepositoryImpl';
import { TestServiceImpl } from './Test/TestServiceImpl';

import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';

export function createControls (): Controls {
  return {
    Breadcrumb: BreadcrumbControl,
    Button: ButtonControl,
    Card: CardControl,
    Form: FormControl,
    Layout: LayoutControl,
    Select: SelectControl,
    Spinner: SpinnerControl,
    Table: TableControl,
    TextArea: TextAreaControl,
    TextInput: TextInputControl,
    Tree: TreeControl,
  }
}

function createComponents (): Components {
  const componentOfConfirmControl = createConfirmControlComponent();

  return {
    Controls: {
      Confirm: componentOfConfirmControl
    }
  };
}

interface HooksOptions {
  readonly components: Components;
  readonly module: Module;
}

export function createHooks ({
  components,
  module: {
    getArticleDomainRepository,
    getTopicDomainRepository,
  }
}: HooksOptions): Hooks {
  const hooksOfApiResponse = createApiResponseHooks();
  const hooksOfConfirmControl = createConfirmControlHooks();
  const hooksOfNotificationControl = createNotificationControlHooks();
  const hooksOfTableControl = createTableControlHooks();
  const hooksOfAppNotificationStore = createAppNotificationStoreHooks();
  const hooksOfAppNotificationView = createAppNotificationViewHooks(hooksOfAppNotificationStore);
  const hooksOfArticleItemStore = createArticleItemStoreHooks();
  const hooksOfArticleItemView = createArticleItemViewHooks(hooksOfArticleItemStore);
  const hooksOfArticleItemEditView = createArticleItemEditViewHooks();
  const hooksOfArticleListStore = createArticleListStoreHooks();
  const hooksOfArticleTableView = createArticleTableViewHooks(hooksOfArticleListStore);
  const hooksOfLocalization = createLocalizationHooks();
  const hooksOfTopicItemStore = createTopicItemStoreHooks();
  const hooksOfTopicItemView = createTopicItemViewHooks(hooksOfTopicItemStore);
  const hooksOfTopicPathView = createTopicPathViewHooks();
  const hooksOfTopicTreeStore = createTopicTreeStoreHooks();
  const hooksOfTopicTreeView = createTopicTreeViewHooks(hooksOfTopicTreeStore);
  const hooksOfOperation = createOperationHooks({ hooksOfAppNotificationStore });
  const hooksOfApiRequest = createApiRequestHooks({ hooksOfOperation });

  const hooksOfArticleDomain = createArticleDomainHooks({
    getArticleDomainRepository,
    hooksOfApiRequest,
  });

  const hooksOfTopicDomain = createTopicDomainHooks({
    getTopicDomainRepository,
    hooksOfApiRequest,
  });

  const componentOfConfirmControl = components.Controls.Confirm;

  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl,
      hooksOfConfirmControl,
      shouldBlock
    });
  }

  return {
    Api: {
      Response: hooksOfApiResponse
    },
    Controls: {
      Confirm: hooksOfConfirmControl,
      Notification: hooksOfNotificationControl,
      Table: hooksOfTableControl
    },
    Domains: {
      Article: hooksOfArticleDomain,
      Topic: hooksOfTopicDomain,
    },
    Localization: hooksOfLocalization,
    Stores: {
      App: {
        Notification: hooksOfAppNotificationStore
      },
      Article: {
        Item: hooksOfArticleItemStore,
        List: hooksOfArticleListStore,
      },
      Topic: {
        Item: hooksOfTopicItemStore,
        Tree: hooksOfTopicTreeStore,
      },
    },
    Views: {
      App: {
        Notification: hooksOfAppNotificationView
      },
      Article: {
        Item: hooksOfArticleItemView,
        ItemEdit: hooksOfArticleItemEditView,
        Table: hooksOfArticleTableView,
      },
      Topic: {
        Item: hooksOfTopicItemView,
        Path: hooksOfTopicPathView,
        Tree: hooksOfTopicTreeView,
      },
    },
    useLeaveFormBlocker
  };
}

function createModule (): Module {
  const apiSetupOptions: ApiSetupOptions = new ApiSetupOptionsImpl({
    queryStringKeyForCulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_CULTURE ?? 'lng',
    queryStringKeyForUICulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_UI_CULTURE ?? 'ui-lng',
    url: process.env.REACT_APP_API_URL ?? ''
  });

  const implOfSetupOptions = new SetupOptionsImpl({
    isTestModeEnabled: process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true'
  });

  const implOfHttpClient = new HttpClientImpl();

  const implOfApiClient = new ApiClientImpl({ apiSetupOptions, httpClient: implOfHttpClient });

  const implOfTestService = new TestServiceImpl();

  function getTestService (): TestService {
    return implOfTestService;
  }

  const implOfStoreService = new StoreServiceImpl();

  function getStoreService (): StoreService {
    return implOfStoreService;
  }

  const implOfTableControlService = new TableControlServiceImpl({ defaultPageSize: 10 });

  function getTableControlService (): TableControlService {
    return implOfTableControlService;
  }

  function createApiResponseError (options: ApiResponseErrorOptions): ApiResponseError {
    return new ApiResponseErrorImpl(options);
  }

  const implOfArticleDomainRepository = implOfSetupOptions.isTestModeEnabled
    ? new TestArticleDomainRepositoryImpl()
    : new ArticleDomainRepositoryImpl({ apiClient: implOfApiClient });

  function getArticleDomainRepository (): ArticleDomainRepository {
    return implOfArticleDomainRepository;
  }

  const implOfTopicDomainRepository = implOfSetupOptions.isTestModeEnabled
    ? new TestTopicDomainRepositoryImpl()
    : new TopicDomainRepositoryImpl({ apiClient: implOfApiClient });

  function getTopicDomainRepository (): TopicDomainRepository {
    return implOfTopicDomainRepository;
  }

  const implOfArticlePageService = new ArticlePageServiceImpl();

  function getArticlePageService (): ArticlePageService {
    return implOfArticlePageService;
  }

  const implOfTopicPageService = new TopicPageServiceImpl({
    tableControlService: getTableControlService()
  });

  function getTopicPageService (): TopicPageService {
    return implOfTopicPageService;
  }

  const implOfArticleItemEditViewService = new ArticleItemEditViewServiceImpl();

  function getArticleItemEditViewService (): ArticleItemEditViewService {
    return implOfArticleItemEditViewService;
  }

  return {
    createApiResponseError,
    getArticleDomainRepository,
    getArticlePageService,
    getArticleItemEditViewService,
    getTableControlService,
    getTestService,
    getTopicDomainRepository,
    getTopicPageService,
    getStoreService,
  };
}

export function createApp (): App {
  const module = createModule();
  const components = createComponents();
  const controls = createControls();
  const hooks = createHooks({ components, module });

  return { components, controls, hooks, module };
};
