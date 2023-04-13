import {
  type TreeGetOperationAxisForItem,
  type ItemGetOperationInput
} from '../../../../../all';

export interface TopicDomainItemGetOperationInput extends ItemGetOperationInput {
  axis: TreeGetOperationAxisForItem;
  name?: string;
  parentId?: string | number;
}
