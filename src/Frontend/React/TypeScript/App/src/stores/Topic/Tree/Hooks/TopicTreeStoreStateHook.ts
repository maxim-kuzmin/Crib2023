import { type TopicTreeStoreState } from '../../../../app';
import { useTopicTreeStoreStateContext } from '../TopicTreeStoreContext';

export function useStoreState (sliceName: string): TopicTreeStoreState {
  return useTopicTreeStoreStateContext(sliceName);
}
