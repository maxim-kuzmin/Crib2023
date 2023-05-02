import { type DataFactories } from '../../data';
import { createDataFactories } from '../../data/DataFactories';

export interface InstanceFactories {
  readonly Data: DataFactories;
}

export function createInstanceFactories (): InstanceFactories {
  const factoriesOfData = createDataFactories();

  return {
    Data: factoriesOfData
  };
}
