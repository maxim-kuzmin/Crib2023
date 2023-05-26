export interface ItemGetOperationOutput<TItem> {
  item: TItem;
}

export function createItemGetOperationOutput<TItem> (
  options: ItemGetOperationOutput<TItem>
): ItemGetOperationOutput<TItem> {
  const { item } = options;

  return { item };
}
