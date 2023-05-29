import { createAppLocalizationSetup } from '../features';
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
      pathOfArticleItemStoreResource,
      pathOfArticleListStoreResource,
      pathOfArticleItemViewResource,
      pathOfArticleItemEditViewResource,
      pathOfArticleTableViewResource,
      pathOfConfirmControlResource,
      pathOfOperationHandlerResource,
      pathOfTableControlResource,
      pathOfTopicItemStoreResource,
      pathOfTopicPathViewResource,
      pathOfTopicTreeStoreResource,
    } = this.instanceOfApp.settings.Features.App.Localization;

    const setupOfLocalization = createAppLocalizationSetup({
      paths: [
        pathOfApiResponseResource,
        pathOfArticleItemStoreResource,
        pathOfArticleItemViewResource,
        pathOfArticleItemEditViewResource,
        pathOfArticleListStoreResource,
        pathOfArticleTableViewResource,
        pathOfConfirmControlResource,
        pathOfTableControlResource,
        pathOfTopicItemStoreResource,
        pathOfTopicPathViewResource,
        pathOfTopicTreeStoreResource,
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
