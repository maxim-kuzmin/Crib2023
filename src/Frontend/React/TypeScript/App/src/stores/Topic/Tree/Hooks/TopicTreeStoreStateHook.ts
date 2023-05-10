import { type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreState } from '../TopicTreeStoreHooks';

export function useStoreState (storeKey: string): TopicTreeStoreState {
  return useTopicTreeStoreState(storeKey);
}
