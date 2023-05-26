export interface ItemGetOperationInput {
  id?: string | number;
}

export function createItemGetOperationInput (
  options?: Partial<ItemGetOperationInput>
): ItemGetOperationInput {
  return {
    id: options?.id
  };
}
