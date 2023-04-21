import { type TopicItemStoreState } from '../../../../app/Stores';
import { useTopicItemStoreStateContext } from '../TopicItemStoreContext';

export function useStoreState (sliceName: string): TopicItemStoreState {
  return useTopicItemStoreStateContext(sliceName);
}
