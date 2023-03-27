import { type ListGetOperationInput, type TreePathGetOperationAxis } from '../../../../../all';

export interface TopicDomainListGetOperationInput extends ListGetOperationInput {
  axis: TreePathGetOperationAxis;
  ids?: number[];
  name?: string;
  treePath?: string;
}
