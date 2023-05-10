import { type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreState } from '../TopicTreeStoreHooks';

export function useStoreState (owner: string): TopicTreeStoreState {
  return useTopicTreeStoreState(owner);
}
