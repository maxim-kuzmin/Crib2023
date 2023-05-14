import { type TopicTreeStoreSlice, type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreState } from '../TopicTreeStoreHooks';

export function useStoreState (slice: TopicTreeStoreSlice): TopicTreeStoreState {
  return useTopicTreeStoreState(slice);
}
