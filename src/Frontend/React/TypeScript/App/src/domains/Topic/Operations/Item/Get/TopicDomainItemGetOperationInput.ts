import {
  type ItemGetOperationInput,
  TreeGetOperationAxisForItem,
  createItemGetOperationInput
} from '../../../../../common';

export interface TopicDomainItemGetOperationInput extends ItemGetOperationInput {
  axis: TreeGetOperationAxisForItem;
  name?: string;
  parentId?: string | number;
}

export function createTopicDomainItemGetOperationInput (
  options?: Partial<TopicDomainItemGetOperationInput>
): TopicDomainItemGetOperationInput {
  const base = createItemGetOperationInput(options);

  return {
    ...base,
    axis: options?.axis ?? TreeGetOperationAxisForItem.Self,
    name: options?.name,
    parentId: options?.parentId,
  };
}
