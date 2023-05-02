import {
  type AppNotificationStoreHooks,
  type ArticleItemStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks
} from '../features';
import { type AppViewHooks } from './App';
import { createAppViewHooks } from './App/AppViewHooks';
import { type ArticleViewHooks } from './Article';
import { createArticleViewHooks } from './Article/ArticleViewHooks';
import { type TopicViewHooks } from './Topic';
import { createTopicViewHooks } from './Topic/TopicViewHooks';

export interface ViewsHooks {
  readonly App: AppViewHooks;
  readonly Article: ArticleViewHooks;
  readonly Topic: TopicViewHooks;
}

interface Options {
  readonly hooksOfAppNotificationStore: AppNotificationStoreHooks;
  readonly hooksOfArticleItemStore: ArticleItemStoreHooks;
  readonly hooksOfArticleListStore: ArticleListStoreHooks;
  readonly hooksOfTopicItemStore: TopicItemStoreHooks;
  readonly hooksOfTopicTreeStore: TopicTreeStoreHooks;
}

export function createViewsHooks ({
  hooksOfAppNotificationStore,
  hooksOfArticleItemStore,
  hooksOfArticleListStore,
  hooksOfTopicItemStore,
  hooksOfTopicTreeStore,
}: Options): ViewsHooks {
  const hooksOfApp = createAppViewHooks({ hooksOfAppNotificationStore });
  const hooksOfArticle = createArticleViewHooks({ hooksOfArticleItemStore, hooksOfArticleListStore });
  const hooksOfTopic = createTopicViewHooks({ hooksOfTopicItemStore, hooksOfTopicTreeStore });

  return {
    App: hooksOfApp,
    Article: hooksOfArticle,
    Topic: hooksOfTopic,
  }
}
