import { type TopicDomainEntity } from '../TopicDomainEntity';

export interface TopicDomainEntityForTree extends TopicDomainEntity {
  treeChildren: TopicDomainEntityForTree[];
  treeHasChildren: boolean;
  treeIsExpanded: boolean;
  treeLevel: number;
}
