export interface SetupOptions {
  readonly isTestModeEnabled: boolean;
}

export function createSetupOptions (): SetupOptions {
  return {
    isTestModeEnabled: process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true'
  }
}
