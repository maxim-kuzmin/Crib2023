import { type ApiSetupOptions } from '../../../all';

export class ApiSetupOptionsImpl implements ApiSetupOptions {
  public readonly url: string;

  constructor (url: string) {
    this.url = (!url && url !== '') || url === '/' ? '' : url;
  }
}
