import { type OptionValueObject, type TopicDomainEntity } from '../../../all';

export interface TopicDomainEntityForItem extends TopicDomainEntity {
  treeAncestors: OptionValueObject[];
}
