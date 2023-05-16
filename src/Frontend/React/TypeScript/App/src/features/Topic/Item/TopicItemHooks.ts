import { type TopicItemStoreHooks } from './Store';

export interface TopicItemHooks {
  readonly Store: TopicItemStoreHooks;
}

interface Options {
  readonly createTopicItemStoreHooks: () => TopicItemStoreHooks;
}

class Implementation implements TopicItemHooks {
  readonly Store: TopicItemStoreHooks;

  constructor ({
    createTopicItemStoreHooks
  }: Options) {
    this.Store = createTopicItemStoreHooks();
  }
}

export function createTopicItemHooks (options: Options): TopicItemHooks {
  return new Implementation(options);
}
