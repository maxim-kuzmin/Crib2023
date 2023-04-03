export interface TreeControlData {
  children: TreeControlData[];
  isExpanded: boolean;
  isLeaf: boolean;
  isSelected: boolean;
  key: string;
  title: string;
}
