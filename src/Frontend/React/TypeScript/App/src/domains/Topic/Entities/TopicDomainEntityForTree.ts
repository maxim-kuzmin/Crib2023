import { type TopicDomainEntity } from '../../../all';

export interface TopicDomainEntityForTree extends TopicDomainEntity {
  treeChildren: TopicDomainEntityForTree[];
  treeHasChildren: boolean;
  treeIsExpanded: boolean;
  treeLevel: number;
}
