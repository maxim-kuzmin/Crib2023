import { type TableControlModule } from './Table';
import { createTableControlModule } from './Table/TableControlModule';

export interface ControlsModule {
  readonly Table: TableControlModule;
}
export function createControlsModule (): ControlsModule {
  const moduleOfTableControl = createTableControlModule();

  return {
    Table: moduleOfTableControl
  };
}
