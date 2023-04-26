import { type HttpClient } from '../../common';
import { type ApiClient } from './ApiClient';
import { ApiClientImpl } from './ApiClientImpl';
import { type ApiSetupOptions } from './Setup';
import { ApiSetupOptionsImpl } from './Setup/ApiSetupOptionsImpl';

export interface ApiModule {
  readonly getClient: () => ApiClient;
  readonly getSetupOptions: () => ApiSetupOptions;
}

interface Options {
  readonly httpClient: HttpClient;
}

export function createApiModule ({
  httpClient
}: Options): ApiModule {
  const implOfSetupOptions: ApiSetupOptions = new ApiSetupOptionsImpl({
    queryStringKeyForCulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_CULTURE ?? 'lng',
    queryStringKeyForUICulture: process.env.REACT_APP_API_QUERY_STRING_KEY_FOR_UI_CULTURE ?? 'ui-lng',
    url: process.env.REACT_APP_API_URL ?? ''
  });

  function getSetupOptions (): ApiSetupOptions {
    return implOfSetupOptions;
  }

  const implOfClient = new ApiClientImpl({ apiSetupOptions: getSetupOptions(), httpClient });

  function getClient () {
    return implOfClient;
  }

  return { getClient, getSetupOptions };
}
