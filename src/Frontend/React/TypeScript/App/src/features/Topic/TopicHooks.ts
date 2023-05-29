import {
  type TopicItemStoreHooks,
  type TopicItemHooks,
  createTopicItemHooks,
} from './Item';
import {
  type TopicTreeStoreHooks,
  type TopicTreeHooks,
  createTopicTreeHooks,
} from './Tree';

export interface TopicHooks {
  readonly Item: TopicItemHooks;
  readonly Tree: TopicTreeHooks;
}

interface Options {
  readonly createTopicItemStoreHooks: (options: {
    readonly pathOfTopicItemStoreResource: string;
  }) => TopicItemStoreHooks;

  readonly createTopicTreeStoreHooks: (options: {
    readonly pathOfTopicTreeStoreResource: string;
  }) => TopicTreeStoreHooks;

  readonly pathOfTopicItemStoreResource: string;
  readonly pathOfTopicTreeStoreResource: string;
}

class Implementation implements TopicHooks {
  readonly Item: TopicItemHooks;
  readonly Tree: TopicTreeHooks;

  constructor ({
    createTopicItemStoreHooks,
    createTopicTreeStoreHooks,
    pathOfTopicItemStoreResource,
    pathOfTopicTreeStoreResource
  }: Options) {
    this.Item = createTopicItemHooks({ createTopicItemStoreHooks, pathOfTopicItemStoreResource });
    this.Tree = createTopicTreeHooks({ createTopicTreeStoreHooks, pathOfTopicTreeStoreResource });
  }
}

export function createTopicHooks (options: Options): TopicHooks {
  return new Implementation(options);
}
