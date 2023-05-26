import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreSaveCompletedActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSaveCompletedAction
  extends StoreActionWithPayload<TopicItemStoreSaveCompletedActionPayload> {
  readonly type: TopicItemStoreActionType.SaveCompleted;
}

export function createTopicItemStoreSaveCompletedAction (
  options: Omit<TopicItemStoreSaveCompletedAction, 'type'>
): TopicItemStoreSaveCompletedAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicItemStoreActionType.SaveCompleted
  };
}
