import { type OptionValueObject } from '../../../common';
import { type TopicDomainEntity } from '../TopicDomainEntity';

export interface TopicDomainEntityForItem extends TopicDomainEntity {
  treeAncestors: OptionValueObject[];
}
