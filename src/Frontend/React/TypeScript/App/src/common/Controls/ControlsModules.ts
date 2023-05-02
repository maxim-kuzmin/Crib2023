import { type TableControlModule } from './Table';
import { createTableControlModule } from './Table/TableControlModule';

export interface ControlsModules {
  readonly Table: TableControlModule;
}
export function createControlsModules (): ControlsModules {
  const moduleOfTable = createTableControlModule();

  return {
    Table: moduleOfTable
  };
}
