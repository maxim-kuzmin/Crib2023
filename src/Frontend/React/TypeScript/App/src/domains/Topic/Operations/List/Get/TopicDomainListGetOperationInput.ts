import { type ListGetOperationInput, type TreeGetOperationAxisForList } from '../../../../../all';

export interface TopicDomainListGetOperationInput extends ListGetOperationInput {
  axis: TreeGetOperationAxisForList;
  ids?: number[];
  name?: string;
  treePath?: string;
}
