import { type DataFactories, createDataFactories } from '../../data';

export interface InstanceFactories {
  readonly Data: DataFactories;
}

class Implementation implements InstanceFactories {
  readonly Data: DataFactories;

  constructor () {
    this.Data = createDataFactories();
  }
}

export function createInstanceFactories (): InstanceFactories {
  return new Implementation();
}
