import { createAppStoreHooks } from './App';
import { createArticleStoreHooks } from './Article';
import { createTopicStoreHooks } from './Topic';

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
