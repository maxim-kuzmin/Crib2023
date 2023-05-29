import { getTableControlResourcePath } from '../controls';
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
    const {
      pathOfApiResponseResource,
      pathOfConfirmControlResource,
      pathOfOperationHandlerResource,
    } = this.instanceOfApp.settings.Features.App.Localization;

    const setupOfLocalization = createAppLocalizationSetup({
      paths: [
        pathOfApiResponseResource,
        getArticleItemStoreResourcePath(),
        getArticleItemViewResourcePath(),
        getArticleItemEditViewResourcePath(),
        getArticleListStoreResourcePath(),
        getArticleTableViewResourcePath(),
        pathOfConfirmControlResource,
        getTableControlResourcePath(),
        getTopicItemStoreResourcePath(),
        getTopicPathViewResourcePath(),
        getTopicTreeStoreResourcePath(),
        pathOfOperationHandlerResource,
      ]
    });

    setupOfLocalization.run();

    await Promise.resolve();
  }
}

export function createAppSetup (options: Options): AppSetup {
  return new Implementation(options);
}
