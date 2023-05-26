import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicTreeStoreLoadCompletedActionPayload } from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadCompletedAction
  extends StoreActionWithPayload<TopicTreeStoreLoadCompletedActionPayload> {
  readonly type: TopicTreeStoreActionType.LoadCompleted;
}

export function createTopicTreeStoreLoadCompletedAction (
  options: Omit<TopicTreeStoreLoadCompletedAction, 'type'>
): TopicTreeStoreLoadCompletedAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicTreeStoreActionType.LoadCompleted
  };
}
