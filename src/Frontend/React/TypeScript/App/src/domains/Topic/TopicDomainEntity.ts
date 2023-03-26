import { type TopicTypeEntity } from '../../all';

export interface TopicDomainEntity {
  data: TopicTypeEntity;
  treeHasChildren: boolean;
  treeLevel: number;
  treePath: string;
}
