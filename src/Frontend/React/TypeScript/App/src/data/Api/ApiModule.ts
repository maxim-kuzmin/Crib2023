import { type HttpClient } from '../../common';
import { type ApiClient, type ApiOptions, createApiClient } from '.';

export interface ApiModule {
  readonly getClient: () => ApiClient;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly optionsOfApi: ApiOptions;
}

class Implementation implements ApiModule {
  private readonly client: ApiClient;

  constructor ({
    httpClient,
    optionsOfApi,
  }: Options) {
    this.client = createApiClient({
      httpClient,
      optionsOfApi,
    });
  }

  getClient (): ApiClient {
    return this.client;
  }
}

export function createApiModule (options: Options): ApiModule {
  return new Implementation(options);
}
