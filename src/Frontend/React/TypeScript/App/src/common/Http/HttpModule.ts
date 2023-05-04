import { type HttpClient, createHttpClient } from './HttpClient';

export interface HttpModule {
  readonly getClient: () => HttpClient;
}

export function createHttpModule (): HttpModule {
  const implOfClient = createHttpClient();

  function getClient (): HttpClient {
    return implOfClient;
  }

  return { getClient };
}
