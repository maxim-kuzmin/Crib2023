import { type TopicItemStoreHooks, type TopicTreeStoreHooks } from '../../features';
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
  readonly pathOfTopicPathViewResource: string;
}

export function createTopicViewHooks ({
  hooksOfTopicItemStore,
  hooksOfTopicTreeStore,
  pathOfTopicPathViewResource,
}: Options): TopicViewHooks {
  const hooksOfItem = createTopicItemViewHooks({ hooksOfTopicItemStore });
  const hooksOfPath = createTopicPathViewHooks({ pathOfTopicPathViewResource });
  const hooksOfTree = createTopicTreeViewHooks({ hooksOfTopicTreeStore });

  return {
    Item: hooksOfItem,
    Path: hooksOfPath,
    Tree: hooksOfTree,
  };
}
