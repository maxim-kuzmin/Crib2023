import { type TopicItemStoreOwner, type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreState } from '../TopicItemStoreHooks';

export function useStoreState (owner: TopicItemStoreOwner): TopicItemStoreState {
  return useTopicItemStoreState(owner);
}
