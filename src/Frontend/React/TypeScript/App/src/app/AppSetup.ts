import { type AppInstance } from '.';
import { createLocalizationSetup } from '../features/Localization/LocalizationSetup';

export interface AppSetup {
  readonly run: () => void;
}

interface Options {
  readonly instanceOfApp: AppInstance;
}

class AppSetupImpl implements AppSetup {
  private readonly instanceOfApp: AppInstance;

  constructor ({
    instanceOfApp,
  }: Options) {
    this.instanceOfApp = instanceOfApp;
  }

  run () {
    const setupOfLocalization = createLocalizationSetup();

    setupOfLocalization.run();
  }
}

export function createAppSetup (options: Options): AppSetup {
  return new AppSetupImpl(options);
}
