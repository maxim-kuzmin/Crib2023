import { type SetupOptions } from '../../../../all';

interface Options {
  isTestModeEnabled: boolean;
}

export class SetupOptionsImpl implements SetupOptions {
  public readonly isTestModeEnabled: boolean;

  constructor (options: Options) {
    this.isTestModeEnabled = options.isTestModeEnabled;
  }
}
