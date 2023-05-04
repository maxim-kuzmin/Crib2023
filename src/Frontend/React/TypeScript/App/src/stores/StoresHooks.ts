import { createAppStoreHooks } from './App/AppStoreHooks';
import { createArticleStoreHooks } from './Article/ArticleStoreHooks';
import { createTopicStoreHooks } from './Topic/TopicStoreHooks';

export function createStoresHooks () {
  const hooksOfApp = createAppStoreHooks();
  const hooksOfArticle = createArticleStoreHooks();
  const hooksOfTopic = createTopicStoreHooks();

  return {
    App: hooksOfApp,
    Article: hooksOfArticle,
    Topic: hooksOfTopic,
  };
}
