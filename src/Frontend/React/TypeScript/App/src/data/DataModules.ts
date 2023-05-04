import { type HttpClient } from '../common';
import { type ApiModule, type ApiOptions } from './Api';
import { createApiModule } from './Api/ApiModule';

export interface DataModules {
  readonly Api: ApiModule;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly optionsOfApi: ApiOptions;
}

export function createDataModules ({
  httpClient,
  optionsOfApi,
}: Options): DataModules {
  const moduleOfApi = createApiModule({
    httpClient,
    optionsOfApi,
  });

  return {
    Api: moduleOfApi,
  };
}
