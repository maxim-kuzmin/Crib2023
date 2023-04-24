import { type TableControlResource } from './TableControlResource';

export interface TableControlHooks {
  readonly useResource: () => TableControlResource;
}
