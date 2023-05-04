import { type HttpClient, createHttpClient } from './HttpClient';

export interface HttpModule {
  readonly getClient: () => HttpClient;
}

class Implementation implements HttpModule {
  private readonly client = createHttpClient();

  getClient (): HttpClient {
    return this.client;
  }
}

export function createHttpModule (): HttpModule {
  return new Implementation();
}
