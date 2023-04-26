import { type SetupOptions } from './SetupOptions';
import { SetupOptionsImpl } from './SetupOptionsImpl';

export interface SetupModule {
  readonly getOptions: () => SetupOptions;
}

export function createSetupModule (): SetupModule {
  const implOfOptions = new SetupOptionsImpl({
    isTestModeEnabled: process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true'
  });

  function getOptions (): SetupOptions {
    return implOfOptions;
  }

  return { getOptions };
}
