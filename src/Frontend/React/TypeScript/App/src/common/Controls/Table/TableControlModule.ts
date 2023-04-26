import { type TableControlService } from './TableControlService';
import { TableControlServiceImpl } from './TableControlServiceImpl';

export interface TableControlModule {
  readonly getService: () => TableControlService;
}

export function createTableControlModule (): TableControlModule {
  const implOfTableControlService = new TableControlServiceImpl({ defaultPageSize: 10 });

  function getService (): TableControlService {
    return implOfTableControlService;
  }

  return { getService };
}
