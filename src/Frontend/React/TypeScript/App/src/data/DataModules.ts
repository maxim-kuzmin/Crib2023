import { type HttpClient } from '../common';
import { type ApiModule, type ApiOptions, createApiModule } from './Api';

export interface DataModules {
  readonly Api: ApiModule;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly optionsOfApi: ApiOptions;
}

class Implementation implements DataModules {
  readonly Api: ApiModule;

  constructor ({
    httpClient,
    optionsOfApi,
  }: Options) {
    this.Api = createApiModule({
      httpClient,
      optionsOfApi,
    });
  }
}

export function createDataModules (options: Options): DataModules {
  return new Implementation(options);
}
