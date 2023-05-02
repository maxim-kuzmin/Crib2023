import { type TopicTreeStoreState } from '../../../../features';
import { useTopicTreeStoreStateContext } from '../TopicTreeStoreContext';

export function useStoreState (sliceName: string): TopicTreeStoreState {
  return useTopicTreeStoreStateContext(sliceName);
}
