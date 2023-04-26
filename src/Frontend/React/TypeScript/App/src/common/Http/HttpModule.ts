import { type HttpClient } from './HttpClient';
import { HttpClientImpl } from './HttpClientImpl';

export interface HttpModule {
  readonly getClient: () => HttpClient;
}

export function createHttpModule (): HttpModule {
  const implOfClient = new HttpClientImpl();

  function getClient (): HttpClient {
    return implOfClient;
  }

  return { getClient };
}
