import { type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreStateContext } from '../TopicItemStoreContext';

export function useStoreState (sliceName: string): TopicItemStoreState {
  return useTopicItemStoreStateContext(sliceName);
}
