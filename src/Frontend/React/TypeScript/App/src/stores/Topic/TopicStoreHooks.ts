import { type TopicStoreHooks } from '../../features';
import { createTopicItemStoreHooks } from './Item/TopicItemStoreHooks';
import { createTopicTreeStoreHooks } from './Tree/TopicTreeStoreHooks';

export function createTopicStoreHooks (): TopicStoreHooks {
  const hooksOfItem = createTopicItemStoreHooks();
  const hooksOfTree = createTopicTreeStoreHooks();

  return {
    Item: hooksOfItem,
    Tree: hooksOfTree,
  };
}