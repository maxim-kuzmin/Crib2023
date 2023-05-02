import { setupOfLocalization } from '../features';

export interface AppSetup {
  readonly run: () => void;
}

function createAppSetup (): AppSetup {
  function run () {
    setupOfLocalization.run();
  }

  return { run };
}

export const setupOfApp = createAppSetup();
