import {
  type ArticleStoreHooks,
  type TopicStoreHooks,
  type StoresHooks
} from '../features';
import {
  createArticleStoreHooks,
  createTopicStoreHooks,
} from '.';

class Implementation implements StoresHooks {
  readonly Article: ArticleStoreHooks;
  readonly Topic: TopicStoreHooks;

  constructor () {
    this.Article = createArticleStoreHooks();
    this.Topic = createTopicStoreHooks();
  }
}

export function createStoresHooks () {
  return new Implementation();
}
