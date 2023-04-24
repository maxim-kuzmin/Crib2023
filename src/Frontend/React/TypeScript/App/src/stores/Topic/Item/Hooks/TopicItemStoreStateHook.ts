import { type TopicItemStoreState } from '../../../../app';
import { useTopicItemStoreStateContext } from '../TopicItemStoreContext';

export function useStoreState (sliceName: string): TopicItemStoreState {
  return useTopicItemStoreStateContext(sliceName);
}
