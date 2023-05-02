import { type HttpClient } from '../common';
import { type ApiModule } from './Api';
import { createApiModule } from './Api/ApiModule';

export interface DataModule {
  readonly Api: ApiModule;
}

interface Options {
  readonly httpClient: HttpClient;
}

export function createDataModule ({
  httpClient
}: Options): DataModule {
  const moduleOfApi = createApiModule({ httpClient });

  return {
    Api: moduleOfApi,
  }
}
