import { type HttpClient } from '../../common';
import { type ApiClient, type ApiSettings, createApiClient } from '.';

export interface ApiModule {
  readonly getClient: () => ApiClient;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly settingsOfApi: ApiSettings;
}

class Implementation implements ApiModule {
  private readonly client: ApiClient;

  constructor ({
    httpClient,
    settingsOfApi,
  }: Options) {
    this.client = createApiClient({
      httpClient,
      settingsOfApi,
    });
  }

  getClient (): ApiClient {
    return this.client;
  }
}

export function createApiModule (options: Options): ApiModule {
  return new Implementation(options);
}
