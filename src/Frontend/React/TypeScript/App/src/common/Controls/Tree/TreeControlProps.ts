import { type TreeControlNode } from '../../../all';

export interface TreeControlProps {
  getChildren: (key: string) => Promise<TreeControlNode[]>;
  controlNodes: TreeControlNode[];
}
