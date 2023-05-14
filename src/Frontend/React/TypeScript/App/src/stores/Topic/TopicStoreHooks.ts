import { type TopicStoreHooks } from '../../features';
import { createTopicItemStoreHooks } from './Item';
import { createTopicTreeStoreHooks } from './Tree';

export function createTopicStoreHooks (): TopicStoreHooks {
  const hooksOfItem = createTopicItemStoreHooks();
  const hooksOfTree = createTopicTreeStoreHooks();

  return {
    Item: hooksOfItem,
    Tree: hooksOfTree,
  };
}
