import {
  type ConfirmControlHooks,
  type NotificationControlHooks,
  type TableControlHooks,
} from '../common';
import { type ApiResponseHooks } from '../data';
import { type TopicDomainHooks, type ArticleDomainHooks } from '../domains';
import {
  type AppNotificationViewHooks,
  type ArticleItemViewHooks,
  type ArticleTableViewHooks,
  type TopicItemViewHooks,
  type TopicPathViewHooks,
  type TopicTreeViewHooks,
} from '../views';
import { type LocalizationHooks } from './Localization';
import {
  type AppNotificationStoreHooks,
  type ArticleItemStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks,
} from './Stores';

import { createOperationHooks } from '../common/Operation/OperationHooks';

import { createConfirmControlHooks } from '../controls/Confirm/ConfirmControlHooks';
import { createNotificationControlHooks } from '../controls/Notification/NotificationControlHooks';
import { createTableControlHooks } from '../controls/Table/TableControlHooks';

import { createApiRequestHooks } from '../data/Api/Request/ApiRequestHooks';
import { createApiResponseHooks } from '../data/Api/Response/ApiResponseHooks';

import { createArticleDomainHooks } from '../domains/Article/ArticleDomainHooks';
import { createTopicDomainHooks } from '../domains/Topic/TopicDomainHooks';

import { createAppNotificationStoreHooks } from '../stores/App/Notification/AppNotificationStoreHooks';
import { createArticleItemStoreHooks } from '../stores/Article/Item/ArticleItemStoreHooks';
import { createArticleListStoreHooks } from '../stores/Article/List/ArticleListStoreHooks';
import { createTopicItemStoreHooks } from '../stores/Topic/Item/TopicItemStoreHooks';
import { createTopicTreeStoreHooks } from '../stores/Topic/Tree/TopicTreeStoreHooks';

import { createAppNotificationViewHooks } from '../views/App/Notification/AppNotificationViewHooks';
import { createArticleItemViewHooks } from '../views/Article/Item/ArticleItemViewHooks';
import { createArticleTableViewHooks } from '../views/Article/Table/ArticleTableViewHooks';
import { createTopicItemViewHooks } from '../views/Topic/Item/TopicItemViewHooks';
import { createTopicPathViewHooks } from '../views/Topic/Path/TopicPathViewHooks';
import { createTopicTreeViewHooks } from '../views/Topic/Tree/TopicTreeViewHooks';

import { useLeaveFormBlocker as useLeaveFormBlockerInner } from './Hooks/LeaveFormBlockerHook';

import { createLocalizationHooks } from './Localization/LocalizationHooks';

import { type Component } from './Component';
import { type Module } from './Module';

export interface Hooks {
  readonly Api: {
    readonly Response: ApiResponseHooks;
  };
  readonly Controls: {
    readonly Confirm: ConfirmControlHooks;
    readonly Notification: NotificationControlHooks;
    readonly Table: TableControlHooks;
  };
  readonly Domains: {
    Article: ArticleDomainHooks;
    Topic: TopicDomainHooks;
  };
  readonly Localization: LocalizationHooks;
  readonly Stores: {
    readonly App: {
      readonly Notification: AppNotificationStoreHooks;
    };
    readonly Article: {
      readonly Item: ArticleItemStoreHooks;
      readonly List: ArticleListStoreHooks;
    };
    readonly Topic: {
      readonly Item: TopicItemStoreHooks;
      readonly Tree: TopicTreeStoreHooks;
    };
  };
  readonly Views: {
    readonly App: {
      readonly Notification: AppNotificationViewHooks;
    };
    readonly Article: {
      readonly Item: ArticleItemViewHooks;
      readonly Table: ArticleTableViewHooks;
    };
    readonly Topic: {
      readonly Item: TopicItemViewHooks;
      readonly Path: TopicPathViewHooks;
      readonly Tree: TopicTreeViewHooks;
    };
  };
  readonly useLeaveFormBlocker: (shouldBlock: boolean) => void;
}

interface HooksOptions {
  readonly component: Component;
  readonly module: Module;
}

export function createHooks ({
  component,
  module
}: HooksOptions): Hooks {
  const hooksOfApiResponse = createApiResponseHooks();
  const hooksOfConfirmControl = createConfirmControlHooks();
  const hooksOfNotificationControl = createNotificationControlHooks();
  const hooksOfTableControl = createTableControlHooks();
  const hooksOfAppNotificationStore = createAppNotificationStoreHooks();
  const hooksOfAppNotificationView = createAppNotificationViewHooks(hooksOfAppNotificationStore);
  const hooksOfArticleItemStore = createArticleItemStoreHooks();
  const hooksOfArticleItemView = createArticleItemViewHooks(hooksOfArticleItemStore);
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
    getArticleDomainRepository: module.Domains.Article.getRepository,
    hooksOfApiRequest
  });

  const hooksOfTopicDomain = createTopicDomainHooks({
    getTopicDomainRepository: module.Domains.Topic.getRepository,
    hooksOfApiRequest
  });

  function useLeaveFormBlocker (shouldBlock: boolean) {
    useLeaveFormBlockerInner({
      componentOfConfirmControl: component.Controls.Confirm,
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
