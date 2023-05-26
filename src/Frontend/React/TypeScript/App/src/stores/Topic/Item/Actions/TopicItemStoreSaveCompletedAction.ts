import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreSaveCompletedActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveCompletedAction
  extends StoreActionWithPayload<TopicItemStoreSaveCompletedActionPayload> {
  readonly type: TopicItemStoreActionType.SaveCompleted;
}

export function createTopicItemStoreSaveCompletedAction (
  payload: TopicItemStoreSaveCompletedActionPayload
): TopicItemStoreSaveCompletedAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicItemStoreActionType.SaveCompleted
  };
}
