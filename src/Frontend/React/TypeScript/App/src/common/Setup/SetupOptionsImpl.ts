import { type SetupOptions } from '../../all';

export class SetupOptionsImpl implements SetupOptions {
  constructor (public readonly isTestModeEnabled: boolean) {
  }
}
