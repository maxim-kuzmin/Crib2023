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

class Implementation implements TopicViewHooks {
  readonly Item: TopicItemViewHooks;
  readonly Path: TopicPathViewHooks;
  readonly Tree: TopicTreeViewHooks;

  constructor ({
    hooksOfTopicItemStore,
    hooksOfTopicTreeStore,
    pathOfTopicPathViewResource,
  }: Options) {
    this.Item = createTopicItemViewHooks({ hooksOfTopicItemStore });
    this.Path = createTopicPathViewHooks({ pathOfTopicPathViewResource });
    this.Tree = createTopicTreeViewHooks({ hooksOfTopicTreeStore });
  }
}

export function createTopicViewHooks (options: Options): TopicViewHooks {
  return new Implementation(options);
}
