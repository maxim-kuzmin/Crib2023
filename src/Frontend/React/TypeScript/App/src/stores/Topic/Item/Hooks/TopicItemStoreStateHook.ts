import { type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreState } from '../TopicItemStoreHooks';

export function useStoreState (sliceName: string): TopicItemStoreState {
  return useTopicItemStoreState(sliceName);
}
