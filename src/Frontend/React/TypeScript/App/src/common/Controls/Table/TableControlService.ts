export interface TableControlService {
  readonly defaultPageSize: number;
}

export function createTableControlService (): TableControlService {
  return {
    defaultPageSize: 10
  };
}
