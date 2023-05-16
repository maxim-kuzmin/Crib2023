import { type TopicTreeStoreHooks } from './Store';

export interface TopicTreeHooks {
  readonly Store: TopicTreeStoreHooks;
}

interface Options {
  readonly createTopicTreeStoreHooks: () => TopicTreeStoreHooks;
}

class Implementation implements TopicTreeHooks {
  readonly Store: TopicTreeStoreHooks;

  constructor ({
    createTopicTreeStoreHooks
  }: Options) {
    this.Store = createTopicTreeStoreHooks();
  }
}

export function createTopicTreeHooks (options: Options): TopicTreeHooks {
  return new Implementation(options);
}
