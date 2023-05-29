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
  readonly pathOfArticleItemViewResource: string;
  readonly pathOfArticleItemEditViewResource: string;
  readonly pathOfTopicPathViewResource: string;
  readonly pathOfArticleTableViewResource: string;
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
    pathOfArticleItemViewResource,
    pathOfArticleItemEditViewResource,
    pathOfArticleTableViewResource,
    pathOfTopicPathViewResource,
  }: Options) {
    this.App = createAppViewHooks({ hooksOfAppNotificationStore });

    this.Article = createArticleViewHooks({
      hooksOfArticleItemStore,
      hooksOfArticleListStore,
      pathOfArticleItemViewResource,
      pathOfArticleItemEditViewResource,
      pathOfArticleTableViewResource,
    });

    this.Topic = createTopicViewHooks({
      hooksOfTopicItemStore,
      hooksOfTopicTreeStore,
      pathOfTopicPathViewResource,
    });
  }
}

export function createViewsHooks (options: Options): ViewsHooks {
  return new Implementation(options);
}
