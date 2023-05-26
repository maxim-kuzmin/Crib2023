import { type ListGetOperationInput, createListGetOperationInput } from '../../List';
import { TreeGetOperationAxisForList } from './Axes';

export interface TreeGetOperationInput extends ListGetOperationInput {
  axis: TreeGetOperationAxisForList;
  expandedNodeId?: number | string;
  expandedNodeIds?: number[] | string[];
  expandedNodeIdsString?: string;
  rootNodeId?: number | string;
  rootNodeTreePath?: string;
}

export function createTreeGetOperationInput (
  options?: Partial<TreeGetOperationInput>
): TreeGetOperationInput {
  const base = createListGetOperationInput(options);

  return {
    ...base,
    axis: options?.axis ?? TreeGetOperationAxisForList.None,
    expandedNodeId: options?.expandedNodeId,
    expandedNodeIds: options?.expandedNodeIds,
    expandedNodeIdsString: options?.expandedNodeIdsString,
    rootNodeId: options?.rootNodeId,
    rootNodeTreePath: options?.rootNodeTreePath,
  };
}
