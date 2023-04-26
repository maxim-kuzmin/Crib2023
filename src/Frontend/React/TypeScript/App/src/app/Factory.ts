import { type ConfirmControlComponent } from '../common';
import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';
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
import { ModuleImpl } from './ModuleImpl';
import {
  type App,
  type Controls,
  type Components,
  type Hooks,
} from '.';

import { createConfirmControlComponent, createConfirmControlHooks } from '../controls/Confirm/ConfirmControlFactory';
import { createNotificationControlHooks } from '../controls/Notification/NotificationControlFactory';
import { createTableControlHooks } from '../controls/Table/TableControlFactory';

import { createApiResponseHooks } from '../data/Api/Response/ApiResponseFactory';

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
  readonly componentOfConfirmControl: ConfirmControlComponent;
}

export function createHooks ({
  componentOfConfirmControl
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

export function createApp (): App {
  const components = createComponents();

  const controls = createControls();

  const hooks = createHooks({
    componentOfConfirmControl: components.Controls.Confirm
  });

  const module = new ModuleImpl(hooks);

  return {
    components,
    controls,
    hooks,
    module,
  };
};
