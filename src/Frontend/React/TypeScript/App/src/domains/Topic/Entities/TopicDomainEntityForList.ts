import { type OptionValueObject, type TopicDomainEntity } from '../../../all';

export interface TopicDomainEntityForList extends TopicDomainEntity {
  treeAncestors: OptionValueObject[];
  treeHasChildren: boolean;
  treeIsExpanded: boolean;
  treeLevel: number;
}
