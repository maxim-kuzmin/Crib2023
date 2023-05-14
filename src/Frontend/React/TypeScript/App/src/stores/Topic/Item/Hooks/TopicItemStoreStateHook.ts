import { type TopicItemStoreSliceName, type TopicItemStoreState } from '../../../../features';
import { useTopicItemStoreState } from '../TopicItemStoreHooks';

export function useStoreState (sliceName: TopicItemStoreSliceName): TopicItemStoreState {
  return useTopicItemStoreState(sliceName);
}
