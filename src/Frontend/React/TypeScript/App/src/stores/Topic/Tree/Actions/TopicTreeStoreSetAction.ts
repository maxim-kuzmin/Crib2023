import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicTreeStoreSetActionPayload } from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreSetAction
  extends StoreActionWithPayload<TopicTreeStoreSetActionPayload> {
  readonly type: TopicTreeStoreActionType.Set;
}

export function createTopicTreeStoreSetAction (
  payload: TopicTreeStoreSetActionPayload
): TopicTreeStoreSetAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicTreeStoreActionType.Set
  };
}
