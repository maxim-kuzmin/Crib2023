import { type OptionValueObjectWithNumberId, type TopicTypeEntity } from '../../all';

export interface TopicDomainEntity {
  data: TopicTypeEntity;
  treeAncestors: OptionValueObjectWithNumberId[];
  treeHasChildren: boolean;
  treeLevel: number;
  treePath: string;
}
