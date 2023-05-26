import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreSaveActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveAction
  extends StoreActionWithPayload<TopicItemStoreSaveActionPayload> {
  readonly type: TopicItemStoreActionType.Save;
}

export function createTopicItemStoreSaveAction (
  payload: TopicItemStoreSaveActionPayload
): TopicItemStoreSaveAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicItemStoreActionType.Save
  };
}
