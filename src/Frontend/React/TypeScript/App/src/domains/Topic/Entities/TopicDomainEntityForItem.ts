import { type OptionValueObjectWithNumberId, type TopicDomainEntity } from '../../../all';

export interface TopicDomainEntityForItem extends TopicDomainEntity {
  treeAncestors: OptionValueObjectWithNumberId[];
}
