import {
  type TreeNodeGetOperationAxis,
  type ItemGetOperationInputWithNumberId
} from '../../../../../all';

export interface TopicDomainItemGetOperationInput extends ItemGetOperationInputWithNumberId {
  axis: TreeNodeGetOperationAxis;
  name?: string;
  parentId?: number;
}
