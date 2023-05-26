import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreDeleteCompletedActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteCompletedAction
  extends StoreActionWithPayload<TopicItemStoreDeleteCompletedActionPayload> {
  readonly type: TopicItemStoreActionType.DeleteCompleted;
}

export function createTopicItemStoreDeleteCompletedAction (
  payload: TopicItemStoreDeleteCompletedActionPayload
): TopicItemStoreDeleteCompletedAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicItemStoreActionType.DeleteCompleted
  };
}
