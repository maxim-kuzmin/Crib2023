import { type ItemGetOperationInput, type TreeGetOperationAxisForItem } from '../../../../../common';

export interface TopicDomainItemGetOperationInput extends ItemGetOperationInput {
  axis: TreeGetOperationAxisForItem;
  name?: string;
  parentId?: string | number;
}
