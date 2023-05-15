import { createLocalizationSetup } from '../features';
import { type AppInstance } from '.';

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
    const setupOfLocalization = createLocalizationSetup();

    setupOfLocalization.run();
  }
}

export function createAppSetup (options: Options): AppSetup {
  return new Implementation(options);
}
