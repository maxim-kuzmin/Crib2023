import {
  type AppStoreHooks,
  type ArticleStoreHooks,
  type TopicStoreHooks,
  type StoresHooks
} from '../features';
import {
  createAppStoreHooks,
  createArticleStoreHooks,
  createTopicStoreHooks,
} from '.';

class Implementation implements StoresHooks {
  readonly App: AppStoreHooks;
  readonly Article: ArticleStoreHooks;
  readonly Topic: TopicStoreHooks;

  constructor () {
    this.App = createAppStoreHooks();
    this.Article = createArticleStoreHooks();
    this.Topic = createTopicStoreHooks();
  }
}

export function createStoresHooks () {
  return new Implementation();
}
