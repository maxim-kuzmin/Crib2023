import { type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreState } from '../TopicItemStoreHooks';

export function useStoreState (storeKey: string): TopicItemStoreState {
  return useTopicItemStoreState(storeKey);
}
