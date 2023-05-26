export interface ListGetOperationOutput<TItem> {
  items: TItem[];
  totalCount: number;
}

export function createListGetOperationOutput<TItem> (
  options?: Partial<ListGetOperationOutput<TItem>>
): ListGetOperationOutput<TItem> {
  return {
    items: options?.items ?? [],
    totalCount: options?.totalCount ?? 0,
  };
}
