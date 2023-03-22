export interface Config {
  readonly isTestModeEnabled: boolean;
}

export function createConfig (): Config {
  return {
    isTestModeEnabled: process.env.REACT_APP_IS_TEST_MODE_ENABLED === 'true'
  }
}
