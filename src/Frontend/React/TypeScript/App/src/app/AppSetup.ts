import { getOperationHandlerResourcePath } from '../common';
import {
  getConfirmControlResourcePath,
  getTableControlResourcePath,
} from '../controls';
import { getApiResponseResourcePath } from '../data';
import { createAppLocalizationSetup } from '../features';
import {
  getArticleItemStoreResourcePath,
  getArticleListStoreResourcePath,
  getTopicItemStoreResourcePath,
  getTopicTreeStoreResourcePath,
} from '../stores';
import {
  getArticleItemViewResourcePath,
  getArticleItemEditViewResourcePath,
  getArticleTableViewResourcePath,
  getTopicPathViewResourcePath,
} from '../views';
import { type AppInstance } from './AppInstance';

export interface AppSetup {
  readonly run: () => Promise<void>;
}

interface Options {
  readonly instanceOfApp: AppInstance;
}

class Implementation implements AppSetup {
  private readonly instanceOfApp: AppInstance;

  constructor ({
    instanceOfApp,
  }: Options) {
    this.instanceOfApp = instanceOfApp;
  }

  async run () {
    const setupOfLocalization = createAppLocalizationSetup({
      paths: [
        getApiResponseResourcePath(),
        getArticleItemStoreResourcePath(),
        getArticleItemViewResourcePath(),
        getArticleItemEditViewResourcePath(),
        getArticleListStoreResourcePath(),
        getArticleTableViewResourcePath(),
        getConfirmControlResourcePath(),
        getOperationHandlerResourcePath(),
        getTableControlResourcePath(),
        getTopicItemStoreResourcePath(),
        getTopicPathViewResourcePath(),
        getTopicTreeStoreResourcePath(),
      ]
    });

    setupOfLocalization.run();

    await Promise.resolve();
  }
}

export function createAppSetup (options: Options): AppSetup {
  return new Implementation(options);
}
