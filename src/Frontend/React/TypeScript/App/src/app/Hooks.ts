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
  type ArticleItemEditViewHooks,
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
      readonly ItemEdit: ArticleItemEditViewHooks;
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
