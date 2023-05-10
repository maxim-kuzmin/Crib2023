import { type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreState } from '../TopicItemStoreHooks';

export function useStoreState (owner: string): TopicItemStoreState {
  return useTopicItemStoreState(owner);
}
