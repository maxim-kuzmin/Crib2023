export interface TreeGetOperationOutput<TNode> {
  nodes: TNode[];
  totalCount: number;
}

export function createTreeGetOperationOutput<TItem> (
  options?: Partial<TreeGetOperationOutput<TItem>>
): TreeGetOperationOutput<TItem> {
  return {
    nodes: options?.nodes ?? [],
    totalCount: options?.totalCount ?? 0,
  };
}
