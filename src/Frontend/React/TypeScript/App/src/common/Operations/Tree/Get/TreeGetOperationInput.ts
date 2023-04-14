import { type ListGetOperationInput } from '../../List';
import { type TreeGetOperationAxisForList } from './Axes';

export interface TreeGetOperationInput extends ListGetOperationInput {
  axis: TreeGetOperationAxisForList;
  expandedNodeId?: number | string;
  expandedNodeIds?: number[] | string[];
  expandedNodeIdsString?: string;
  rootNodeId?: number | string;
  rootNodeTreePath?: string;
}
