import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreDeleteActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteAction
  extends StoreActionWithPayload<TopicItemStoreDeleteActionPayload> {
  readonly type: TopicItemStoreActionType.Delete;
}

export function createTopicItemStoreDeleteAction (
  payload: TopicItemStoreDeleteActionPayload
): TopicItemStoreDeleteAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicItemStoreActionType.Delete
  };
}
