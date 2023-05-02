import { type HttpClient } from '../../common';
import { type ApiClient } from './ApiClient';
import { ApiClientImpl } from './ApiClientImpl';
import { type ApiOptions } from './ApiOptions';

export interface ApiModule {
  readonly getClient: () => ApiClient;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly optionsOfApi: ApiOptions;
}

export function createApiModule ({
  httpClient,
  optionsOfApi,
}: Options): ApiModule {
  const implOfClient = new ApiClientImpl({
    httpClient,
    optionsOfApi,
  });

  function getClient () {
    return implOfClient;
  }

  return { getClient };
}
