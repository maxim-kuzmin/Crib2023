import { type TopicItemStoreHooks } from './Item';
import { type TopicTreeStoreHooks } from './Tree';

export interface TopicStoreHooks {
  readonly Item: TopicItemStoreHooks;
  readonly Tree: TopicTreeStoreHooks;
}
