import { type HttpClient } from '../common';
import { type ApiModule, type ApiSettings, createApiModule } from './Api';

export interface DataModules {
  readonly Api: ApiModule;
}

interface Options {
  readonly httpClient: HttpClient;
  readonly settingsOfApi: ApiSettings;
}

class Implementation implements DataModules {
  readonly Api: ApiModule;

  constructor ({
    httpClient,
    settingsOfApi,
  }: Options) {
    this.Api = createApiModule({
      httpClient,
      settingsOfApi,
    });
  }
}

export function createDataModules (options: Options): DataModules {
  return new Implementation(options);
}
