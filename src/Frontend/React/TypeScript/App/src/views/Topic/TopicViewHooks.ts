import { type TopicItemStoreHooks, type TopicTreeStoreHooks } from '../../app';
import { type TopicItemViewHooks } from './Item';
import { createTopicItemViewHooks } from './Item/TopicItemViewHooks';
import { type TopicPathViewHooks } from './Path';
import { createTopicPathViewHooks } from './Path/TopicPathViewHooks';
import { type TopicTreeViewHooks } from './Tree';
import { createTopicTreeViewHooks } from './Tree/TopicTreeViewHooks';

export interface TopicViewHooks {
  readonly Item: TopicItemViewHooks;
  readonly Path: TopicPathViewHooks;
  readonly Tree: TopicTreeViewHooks;
}

interface Options {
  readonly hooksOfTopicItemStore: TopicItemStoreHooks;
  readonly hooksOfTopicTreeStore: TopicTreeStoreHooks;
}

export function createTopicViewHooks ({
  hooksOfTopicItemStore,
  hooksOfTopicTreeStore
}: Options): TopicViewHooks {
  const hooksOfItem = createTopicItemViewHooks({ hooksOfTopicItemStore });
  const hooksOfPath = createTopicPathViewHooks();
  const hooksOfTree = createTopicTreeViewHooks({ hooksOfTopicTreeStore });

  return {
    Item: hooksOfItem,
    Path: hooksOfPath,
    Tree: hooksOfTree,
  };
}
