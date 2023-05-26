import { type StoreActionPayload, createStoreActionPayload } from '../../../../../../common';
import { type TopicTreeStoreSliceName } from '../../Slice';

export interface TopicTreeStoreClearActionPayload
  extends StoreActionPayload<TopicTreeStoreSliceName> {
}

export function createTopicTreeStoreClearActionPayload (
  options: TopicTreeStoreClearActionPayload
): TopicTreeStoreClearActionPayload {
  return createStoreActionPayload(options);
}
