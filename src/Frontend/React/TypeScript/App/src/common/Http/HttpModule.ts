import { type HttpClient } from './HttpClient';
import { HttpClientImpl } from './HttpClientImpl';

export interface HttpModule {
  readonly getClient: () => HttpClient;
}

export function createHttpModule (): HttpModule {
  const implOfHttpClient = new HttpClientImpl();

  function getClient (): HttpClient {
    return implOfHttpClient;
  }

  return { getClient };
}
