import { type ListGetOperationInput, type TreeGetOperationAxisForList } from '../../../../all';

export interface TreeGetOperationInput<TId> extends ListGetOperationInput {
  axis: TreeGetOperationAxisForList;
  expandedNodeId?: TId;
  expandedNodeIds?: TId[];
  expandedNodeIdsString?: string;
  rootNodeId?: TId;
  rootNodeTreePath?: string;
}
