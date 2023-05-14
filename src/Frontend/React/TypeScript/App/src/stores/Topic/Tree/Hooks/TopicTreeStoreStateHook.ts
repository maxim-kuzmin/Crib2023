import { type TopicTreeStoreSliceName, type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreState } from '../TopicTreeStoreHooks';

export function useStoreState (sliceName: TopicTreeStoreSliceName): TopicTreeStoreState {
  return useTopicTreeStoreState(sliceName);
}
