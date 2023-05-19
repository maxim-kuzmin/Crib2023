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
  readonly run: () => void;
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

  run () {
    const setupOfLocalization = createAppLocalizationSetup({
      paths: [
        getApiResponseResourcePath(),
        getArticleItemStoreResourcePath(),
        getArticleItemViewResourcePath(),
        getArticleItemEditViewResourcePath(),
        getArticleListStoreResourcePath(),
        getArticleTableViewResourcePath(),
        getConfirmControlResourcePath(),
        getTableControlResourcePath(),
        getTopicItemStoreResourcePath(),
        getTopicPathViewResourcePath(),
        getTopicTreeStoreResourcePath(),
      ]
    });

    setupOfLocalization.run();
  }
}

export function createAppSetup (options: Options): AppSetup {
  return new Implementation(options);
}
