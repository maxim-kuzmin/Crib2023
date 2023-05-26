import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicTreeStoreSetActionPayload } from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreSetAction
  extends StoreActionWithPayload<TopicTreeStoreSetActionPayload> {
  readonly type: TopicTreeStoreActionType.Set;
}

export function createTopicTreeStoreSetAction (
  options: Omit<TopicTreeStoreSetAction, 'type'>
): TopicTreeStoreSetAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicTreeStoreActionType.Set
  };
}
