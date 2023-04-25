import { type ApiSetupOptions } from './ApiSetupOptions';

export class ApiSetupOptionsImpl implements ApiSetupOptions {
  public readonly queryStringKeyForCulture: string;
  public readonly queryStringKeyForUICulture: string;
  public readonly url: string;

  constructor ({
    queryStringKeyForCulture,
    queryStringKeyForUICulture,
    url
  }: ApiSetupOptions) {
    this.queryStringKeyForCulture = queryStringKeyForCulture;
    this.queryStringKeyForUICulture = queryStringKeyForUICulture;
    this.url = (!url && url !== '') || url === '/' ? '' : url;
  }
}
