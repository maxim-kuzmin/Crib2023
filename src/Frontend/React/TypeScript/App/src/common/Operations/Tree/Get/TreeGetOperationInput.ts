import { type ListGetOperationInput, type TreeGetOperationAxisForList } from '../../../../all';

export interface TreeGetOperationInput extends ListGetOperationInput {
  axis: TreeGetOperationAxisForList;
  expandedNodeId?: number | string;
  expandedNodeIds?: number[] | string[];
  expandedNodeIdsString?: string;
  rootNodeId?: number | string;
  rootNodeTreePath?: string;
}
