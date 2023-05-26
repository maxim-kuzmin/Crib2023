import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicItemStoreSliceName } from '../../Slice';

export interface TopicItemStoreClearActionPayload
  extends StoreActionPayload<TopicItemStoreSliceName> {
}

export function createTopicItemStoreClearActionPayload (
  options: TopicItemStoreClearActionPayload
): TopicItemStoreClearActionPayload {
  return createStoreActionPayload(options);
}
