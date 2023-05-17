import { createAppLocalizationSetup } from '../features';
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
    console.log('1111111');
    const setupOfLocalization = createAppLocalizationSetup();

    setupOfLocalization.run();
  }
}

export function createAppSetup (options: Options): AppSetup {
  return new Implementation(options);
}
