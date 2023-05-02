import { type DataFactory } from '../data';
import { createDataFactory } from '../data/DataFactory';

export interface AppFactory {
  readonly Data: DataFactory;
}

export function createAppFactory (): AppFactory {
  const factoryOfData = createDataFactory();

  return {
    Data: factoryOfData
  };
}
