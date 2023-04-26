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
import { type App, type Controls, type Components, type Hooks } from '.';

import { createOperationHooks } from '../common/Operation/OperationFactory';

import { createConfirmControlComponent, createConfirmControlHooks } from '../controls/Confirm/ConfirmControlFactory';
import { createNotificationControlHooks } from '../controls/Notification/NotificationControlFactory';
import { createTableControlHooks } from '../controls/Table/TableControlFactory';

import { createApiRequestHooks } from '../data/Api/Request/ApiRequestFactory';
import { createApiResponseFactory } from '../data/Api/Response/ApiResponseFactory';

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

import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
import { type Factories } from './Factories';
import { type Modules } from './Modules';
import { createArticleDomainModule } from '../domains/Article/ArticleDomainModule';
import { createApiModule } from '../data/Api/ApiModule';
import { createSetupModule } from '../common/Setup/SetupModule';
import { createHttpModule } from '../common/Http/HttpModule';
import { createTopicDomainModule } from '../domains/Topic/TopicDomainModule';
import { createArticlePageModule } from '../pages/Article/ArticlePageModule';
import { createTableControlModule } from '../common/Controls/Table/TableControlModule';
import { createTopicPageModule } from '../pages/Topic/TopicPageModule';
import { createArticleItemEditViewModule } from '../views/Article/Item/Edit/ArticleItemEditViewModule';
import { createTestModule } from './Test/TestModule';
import { createStoreModule } from '../common/Store/StoreModule';

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
  };
}

function createComponents (): Components {
  const componentOfConfirmControl = createConfirmControlComponent();

  return {
    Controls: {
      Confirm: componentOfConfirmControl
    }
  };
}

function createFactories (): Factories {
  const factoryOfApiResponse = createApiResponseFactory();

  return {
    Api: {
      Response: factoryOfApiResponse
    }
  };
}

interface HooksOptions {
  readonly components: Components;
  readonly factories: Factories;
  readonly modules: Modules;
}

function createHooks ({
  components,
  factories,
  modules
}: HooksOptions): Hooks {
  const hooksOfApiResponse = factories.Api.Response.createHooks();
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
    getArticleDomainRepository: modules.Domains.Article.getRepository,
    hooksOfApiRequest
  });

  const hooksOfTopicDomain = createTopicDomainHooks({
    getTopicDomainRepository: modules.Domains.Topic.getRepository,
    hooksOfApiRequest
  });

  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl: components.Controls.Confirm,
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

function createModules (): Modules {
  const moduleOfSetup = createSetupModule();
  const moduleOfHttp = createHttpModule();
  const moduleOfArticlePage = createArticlePageModule();
  const moduleOfTableControl = createTableControlModule();
  const moduleOfArticleItemEditView = createArticleItemEditViewModule();
  const moduleOfTest = createTestModule();
  const moduleOfStore = createStoreModule();

  const moduleOfApi = createApiModule({
    httpClient: moduleOfHttp.getClient()
  });

  const moduleOfArticleDomain = createArticleDomainModule({
    apiClient: moduleOfApi.getClient(),
    setupOptions: moduleOfSetup.getOptions()
  });

  const moduleOfTopicDomain = createTopicDomainModule({
    apiClient: moduleOfApi.getClient(),
    setupOptions: moduleOfSetup.getOptions()
  });

  const moduleOfTopicPage = createTopicPageModule({
    tableControlService: moduleOfTableControl.getService()
  });

  return {
    Api: moduleOfApi,
    Controls: {
      Table: moduleOfTableControl,
    },
    Domains: {
      Article: moduleOfArticleDomain,
      Topic: moduleOfTopicDomain,
    },
    Http: moduleOfHttp,
    Pages: {
      Article: moduleOfArticlePage,
      Topic: moduleOfTopicPage,
    },
    Setup: moduleOfSetup,
    Store: moduleOfStore,
    Test: moduleOfTest,
    Views: {
      Article: {
        ItemEdit: moduleOfArticleItemEditView,
      }
    }
  };
}

export function createApp (): App {
  const factories = createFactories();
  const modules = createModules();
  const components = createComponents();
  const controls = createControls();
  const hooks = createHooks({ components, factories, modules });

  return { components, controls, factories, hooks, modules };
};
