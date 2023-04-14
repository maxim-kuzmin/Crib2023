import { type TreeControlNode } from './TreeControlNode';

export interface TreeControlProps {
  getChildren: (key: string) => Promise<TreeControlNode[]>;
  controlNodes: TreeControlNode[];
}
