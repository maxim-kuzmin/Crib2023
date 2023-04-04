export interface TreeControlNode {
  children: TreeControlNode[];
  href: string;
  isExpanded: boolean;
  isLeaf: boolean;
  isSelected: boolean;
  key: React.Key;
  title: string;
}
