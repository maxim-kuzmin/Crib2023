import { type ApiSetupOptions } from './ApiSetupOptions';

interface Options {
  url: string;
}

export class ApiSetupOptionsImpl implements ApiSetupOptions {
  public readonly url: string;

  constructor (options: Options) {
    const { url } = options;

    this.url = (!url && url !== '') || url === '/' ? '' : url;
  }
}
