import { type TableControlModule } from '../common';
import { createTableControlModule } from '../common/Controls/Table/TableControlModule';

export interface ControlsModule {
  readonly Table: TableControlModule;
}

export function createControlsModule (): ControlsModule {
  const moduleOfTableControl = createTableControlModule();

  return {
    Table: moduleOfTableControl
  };
}
