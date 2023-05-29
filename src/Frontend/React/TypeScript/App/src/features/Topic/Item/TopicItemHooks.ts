import { type TopicItemStoreHooks } from './Store';

export interface TopicItemHooks {
  readonly Store: TopicItemStoreHooks;
}

interface Options {
  readonly createTopicItemStoreHooks: (options: {
    readonly pathOfTopicItemStoreResource: string;
  }) => TopicItemStoreHooks;

  readonly pathOfTopicItemStoreResource: string;
}

class Implementation implements TopicItemHooks {
  readonly Store: TopicItemStoreHooks;

  constructor ({
    createTopicItemStoreHooks,
    pathOfTopicItemStoreResource
  }: Options) {
    this.Store = createTopicItemStoreHooks({ pathOfTopicItemStoreResource });
  }
}

export function createTopicItemHooks (options: Options): TopicItemHooks {
  return new Implementation(options);
}
