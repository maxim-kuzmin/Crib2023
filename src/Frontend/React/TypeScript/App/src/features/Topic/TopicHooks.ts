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
  readonly createTopicItemStoreHooks: () => TopicItemStoreHooks;
  readonly createTopicTreeStoreHooks: () => TopicTreeStoreHooks;
}

class Implementation implements TopicHooks {
  readonly Item: TopicItemHooks;
  readonly Tree: TopicTreeHooks;

  constructor ({
    createTopicItemStoreHooks,
    createTopicTreeStoreHooks,
  }: Options) {
    this.Item = createTopicItemHooks({ createTopicItemStoreHooks });
    this.Tree = createTopicTreeHooks({ createTopicTreeStoreHooks });
  }
}

export function createTopicHooks (options: Options): TopicHooks {
  return new Implementation(options);
}
