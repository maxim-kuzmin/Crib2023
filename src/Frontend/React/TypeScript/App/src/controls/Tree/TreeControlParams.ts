import { type TreeControlNode } from '../../all';

export interface TreeControlParams {
  getChildrenCallback: (key: string) => Promise<TreeControlNode[]>;
  controlNodes: TreeControlNode[];
}
