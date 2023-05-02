import { type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreState } from '../TopicTreeStoreHooks';

export function useStoreState (sliceName: string): TopicTreeStoreState {
  return useTopicTreeStoreState(sliceName);
}
