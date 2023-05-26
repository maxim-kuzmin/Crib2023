import { type OperationSortDirection } from '../../../Operation/OperationSortDirection';

export interface ListGetOperationInput {
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: OperationSortDirection;
  sortField?: string;
}

export function createListGetOperationInput (
  options?: Partial<ListGetOperationInput>
): ListGetOperationInput {
  return {
    pageNumber: options?.pageNumber,
    pageSize: options?.pageSize,
    sortDirection: options?.sortDirection,
    sortField: options?.sortField,
  };
}
