import { type Context, createContext, useContext } from 'react';
import { createNotificationControlService, type NotificationControlService } from '../../controls';
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
} from '../../stores';

interface Module {
  readonly getNotificationControlService: () => NotificationControlService;
  readonly getAppNotificationStoreService: () => AppNotificationStoreService;
  readonly getArticleItemStoreService: () => ArticleItemStoreService;
  readonly getArticleListStoreService: () => ArticleListStoreService;
  readonly getTopicItemStoreService: () => TopicItemStoreService;
  readonly getTopicPathStoreService: () => TopicPathStoreService;
  readonly getTopicTreeStoreService: () => TopicTreeStoreService;
}

const instanceOfNotificationControlService = createNotificationControlService();
const instanceOfAppNotificationStoreService = creareAppNotificationStoreService();
const instanceOfArticleItemStoreService = createArticleItemStoreService();
const instanceOfArticleListStoreService = createArticleListStoreService();
const instanceOfTopicItemStoreService = createTopicItemStoreService();
const instanceOfTopicPathStoreService = createTopicPathStoreService();
const instanceOfTopicTreeStoreService = createTopicTreeStoreService();

const module: Module = {
  getNotificationControlService: () => instanceOfNotificationControlService,
  getAppNotificationStoreService: () => instanceOfAppNotificationStoreService,
  getArticleItemStoreService: () => instanceOfArticleItemStoreService,
  getArticleListStoreService: () => instanceOfArticleListStoreService,
  getTopicItemStoreService: () => instanceOfTopicItemStoreService,
  getTopicPathStoreService: () => instanceOfTopicPathStoreService,
  getTopicTreeStoreService: () => instanceOfTopicTreeStoreService
};

const ModuleContext = createContext<Module | null>(null);

export interface AppModuleService {
  readonly ModuleContext: Context<Module | null>;
  readonly module: Module;
}

export function createAppModuleService (): AppModuleService {
  return {
    ModuleContext,
    module
  };
}

export function useAppModule (): Module {
  return useContext(ModuleContext)!;
}
