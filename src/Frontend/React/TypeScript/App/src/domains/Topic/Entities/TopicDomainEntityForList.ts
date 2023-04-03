import { type OptionValueObjectWithNumberId, type TopicDomainEntity } from '../../../all';

export interface TopicDomainEntityForList extends TopicDomainEntity {
  treeAncestors: OptionValueObjectWithNumberId[];
  treeHasChildren: boolean;
  treeIsExpanded: boolean;
  treeLevel: number;
}
