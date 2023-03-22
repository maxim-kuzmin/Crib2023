import { type TopicTypeEntity } from '../../all';

export interface TopicEntity {
  data: TopicTypeEntity;
  treeHasChildren: boolean;
  treeLevel: number;
  treePath: string;
}
