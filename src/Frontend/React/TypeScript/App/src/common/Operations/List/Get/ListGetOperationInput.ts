import { type OperationSortDirection } from '../../../Operation/OperationSortDirection';

export interface ListGetOperationInput {
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: OperationSortDirection;
  sortField?: string;
}
