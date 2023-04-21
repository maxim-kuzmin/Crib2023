import { type TopicTreeStoreState } from '../../../../app/Stores';
import { useTopicTreeStoreStateContext } from '../TopicTreeStoreContext';

export function useStoreState (sliceName: string): TopicTreeStoreState {
  return useTopicTreeStoreStateContext(sliceName);
}
