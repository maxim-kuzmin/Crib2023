import { type TreeControlNode } from '../../all';

export interface TreeControlProps {
  getChildrenCallback: (key: string) => Promise<TreeControlNode[]>;
  controlNodes: TreeControlNode[];
}
