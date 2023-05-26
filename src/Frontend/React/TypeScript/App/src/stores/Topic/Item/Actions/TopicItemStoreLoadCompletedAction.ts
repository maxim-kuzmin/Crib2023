import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreLoadCompletedActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadCompletedAction
  extends StoreActionWithPayload<TopicItemStoreLoadCompletedActionPayload> {
  readonly type: TopicItemStoreActionType.LoadCompleted;
}

export function createTopicItemStoreLoadCompletedAction (
  options: Omit<TopicItemStoreLoadCompletedAction, 'type'>
): TopicItemStoreLoadCompletedAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicItemStoreActionType.LoadCompleted
  };
}
