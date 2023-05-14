import { type TopicItemStoreSlice, type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreState } from '../TopicItemStoreHooks';

export function useStoreState (slice: TopicItemStoreSlice): TopicItemStoreState {
  return useTopicItemStoreState(slice);
}
