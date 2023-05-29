import { type TopicTreeStoreHooks } from './Store';

export interface TopicTreeHooks {
  readonly Store: TopicTreeStoreHooks;
}

interface Options {
  readonly createTopicTreeStoreHooks: (options: {
    readonly pathOfTopicTreeStoreResource: string;
  }) => TopicTreeStoreHooks;

  readonly pathOfTopicTreeStoreResource: string;
}

class Implementation implements TopicTreeHooks {
  readonly Store: TopicTreeStoreHooks;

  constructor ({
    createTopicTreeStoreHooks,
    pathOfTopicTreeStoreResource
  }: Options) {
    this.Store = createTopicTreeStoreHooks({ pathOfTopicTreeStoreResource });
  }
}

export function createTopicTreeHooks (options: Options): TopicTreeHooks {
  return new Implementation(options);
}
