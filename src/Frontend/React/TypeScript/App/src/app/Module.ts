import { createStoreDispatchHandler, type NotificationData, type StoreDispatchHandler } from '../common';
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
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicPathStoreService: () => TopicPathStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
  readonly getStoreDispatchHandler: (
    functionToSetNotification: (data: NotificationData | null) => void
  ) => StoreDispatchHandler;
}

const notificationControlService = createNotificationControlService();
const appNotificationStoreService = creareAppNotificationStoreService();
const articleItemStoreService = createArticleItemStoreService();
const articleListStoreService = createArticleListStoreService();
const topicItemStoreService = createTopicItemStoreService();
const topicPathStoreService = createTopicPathStoreService();
const topicTreeStoreService = createTopicTreeStoreService();

const module: Module = {
  getNotificationControlService: () => notificationControlService,
  getAppNotificationStoreService: () => appNotificationStoreService,
  getArticleItemStoreService: () => articleItemStoreService,
  getArticleListStoreService: () => articleListStoreService,
  getTopicItemStoreService: () => topicItemStoreService,
  getTopicPathStoreService: () => topicPathStoreService,
  getTopicTreeStoreService: () => topicTreeStoreService,
  getStoreDispatchHandler: (
    functionToSetNotification: (data: NotificationData | null) => void
  ) => createStoreDispatchHandler(functionToSetNotification)
};

export function getModule (): Module {
  return module;
}
