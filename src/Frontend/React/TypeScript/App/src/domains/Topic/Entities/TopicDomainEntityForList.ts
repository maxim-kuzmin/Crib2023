import { type OptionValueObject } from '../../../common';
import { type TopicDomainEntity } from '../TopicDomainEntity';

export interface TopicDomainEntityForList extends TopicDomainEntity {
  treeAncestors: OptionValueObject[];
  treeHasChildren: boolean;
  treeIsExpanded: boolean;
  treeLevel: number;
}
