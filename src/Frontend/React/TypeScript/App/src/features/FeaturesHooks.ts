import {
  type AppHooks,
  type AppNotificationStoreHooks,
  createAppHooks
} from './App';
import {
  type ArticleHooks,
  type ArticleItemStoreHooks,
  type ArticleListStoreHooks,
  createArticleHooks,
} from './Article';
import {
  type TopicHooks,
  type TopicItemStoreHooks,
  type TopicTreeStoreHooks,
  createTopicHooks,
} from './Topic';

export interface FeaturesHooks {
  readonly App: AppHooks;
  readonly Article: ArticleHooks;
  readonly Topic: TopicHooks;
}

interface Options {
  readonly createAppNotificationStoreHooks: () => AppNotificationStoreHooks;

  readonly createArticleItemStoreHooks: (options: {
    readonly pathOfArticleItemStoreResource: string;
  }) => ArticleItemStoreHooks;

  readonly createArticleListStoreHooks: (options: {
    readonly pathOfArticleListStoreResource: string;
  }) => ArticleListStoreHooks;

  readonly createTopicItemStoreHooks: (options: {
    readonly pathOfTopicItemStoreResource: string;
  }) => TopicItemStoreHooks;

  readonly createTopicTreeStoreHooks: (options: {
    readonly pathOfTopicTreeStoreResource: string;
  }) => TopicTreeStoreHooks;

  readonly pathOfArticleItemStoreResource: string;
  readonly pathOfArticleListStoreResource: string;
  readonly pathOfTopicItemStoreResource: string;
  readonly pathOfTopicTreeStoreResource: string;
}

class Implementation implements FeaturesHooks {
  readonly App: AppHooks;
  readonly Article: ArticleHooks;
  readonly Topic: TopicHooks;

  constructor ({
    createAppNotificationStoreHooks,
    createArticleItemStoreHooks,
    createArticleListStoreHooks,
    createTopicItemStoreHooks,
    createTopicTreeStoreHooks,
    pathOfArticleItemStoreResource,
    pathOfArticleListStoreResource,
    pathOfTopicItemStoreResource,
    pathOfTopicTreeStoreResource,
  }: Options) {
    this.App = createAppHooks({ createAppNotificationStoreHooks });

    this.Article = createArticleHooks({
      createArticleItemStoreHooks,
      createArticleListStoreHooks,
      pathOfArticleItemStoreResource,
      pathOfArticleListStoreResource,
    });

    this.Topic = createTopicHooks({
      createTopicItemStoreHooks,
      createTopicTreeStoreHooks,
      pathOfTopicItemStoreResource,
      pathOfTopicTreeStoreResource,
    });
  }
}

export function createFeaturesHooks (options: Options): FeaturesHooks {
  return new Implementation(options);
}
