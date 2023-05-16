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
  readonly createArticleItemStoreHooks: () => ArticleItemStoreHooks;
  readonly createArticleListStoreHooks: () => ArticleListStoreHooks;
  readonly createTopicItemStoreHooks: () => TopicItemStoreHooks;
  readonly createTopicTreeStoreHooks: () => TopicTreeStoreHooks;
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
  }: Options) {
    this.App = createAppHooks({ createAppNotificationStoreHooks });
    this.Article = createArticleHooks({ createArticleItemStoreHooks, createArticleListStoreHooks });
    this.Topic = createTopicHooks({ createTopicItemStoreHooks, createTopicTreeStoreHooks });
  }
}

export function createFeaturesHooks (options: Options): FeaturesHooks {
  return new Implementation(options);
}
