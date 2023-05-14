import { type TopicTreeStoreOwner, type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreState } from '../TopicTreeStoreHooks';

export function useStoreState (owner: TopicTreeStoreOwner): TopicTreeStoreState {
  return useTopicTreeStoreState(owner);
}
