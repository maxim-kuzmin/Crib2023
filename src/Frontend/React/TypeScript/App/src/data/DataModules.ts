import { type HttpClient } from '../common';
import { type ApiModule } from './Api';
import { createApiModule } from './Api/ApiModule';

export interface DataModules {
  readonly Api: ApiModule;
}

interface Options {
  readonly httpClient: HttpClient;
}

export function createDataModules ({
  httpClient
}: Options): DataModules {
  const moduleOfApi = createApiModule({ httpClient });

  return {
    Api: moduleOfApi,
  }
}
