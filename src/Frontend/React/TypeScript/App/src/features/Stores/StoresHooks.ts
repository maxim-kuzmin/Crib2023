import { type ArticleStoreHooks } from './Article';
import { type TopicStoreHooks } from './Topic';

export interface StoresHooks {
  readonly Article: ArticleStoreHooks;
  readonly Topic: TopicStoreHooks;
}
