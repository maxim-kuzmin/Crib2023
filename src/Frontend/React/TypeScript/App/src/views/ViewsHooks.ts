import {
  type AppNotificationStoreHooks,
  type ArticleItemStoreHooks,
  type ArticleListStoreHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks
} from '../features';
import {
  type AppViewHooks,
  type ArticleViewHooks,
  type TopicViewHooks,
  createAppViewHooks,
  createArticleViewHooks,
  createTopicViewHooks,
 } from '.';

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

class Implementation implements ViewsHooks {
  readonly App: AppViewHooks;
  readonly Article: ArticleViewHooks;
  readonly Topic: TopicViewHooks;

  constructor ({
    hooksOfAppNotificationStore,
    hooksOfArticleItemStore,
    hooksOfArticleListStore,
    hooksOfTopicItemStore,
    hooksOfTopicTreeStore,
  }: Options) {
    this.App = createAppViewHooks({ hooksOfAppNotificationStore });
    this.Article = createArticleViewHooks({ hooksOfArticleItemStore, hooksOfArticleListStore });
    this.Topic = createTopicViewHooks({ hooksOfTopicItemStore, hooksOfTopicTreeStore });
  }
}

export function createViewsHooks (options: Options): ViewsHooks {
  return new Implementation(options);
}
