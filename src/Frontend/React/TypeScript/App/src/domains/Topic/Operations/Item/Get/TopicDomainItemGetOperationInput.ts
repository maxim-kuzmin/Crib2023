import {
  type TreeGetOperationAxisForItem,
  type ItemGetOperationInputWithNumberId
} from '../../../../../all';

export interface TopicDomainItemGetOperationInput extends ItemGetOperationInputWithNumberId {
  axis: TreeGetOperationAxisForItem;
  name?: string;
  parentId?: number;
}
