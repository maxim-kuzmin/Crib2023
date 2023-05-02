import { type AppStoreHooks } from './App';
import { type ArticleStoreHooks } from './Article';
import { type TopicStoreHooks } from './Topic';

export interface StoresHooks {
  readonly App: AppStoreHooks;
  readonly Article: ArticleStoreHooks;
  readonly Topic: TopicStoreHooks;
}
