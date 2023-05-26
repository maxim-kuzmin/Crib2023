import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicTreeStoreLoadActionPayload } from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadAction
  extends StoreActionWithPayload<TopicTreeStoreLoadActionPayload> {
  readonly type: TopicTreeStoreActionType.Load;
}

export function createTopicTreeStoreLoadAction (
  payload: TopicTreeStoreLoadActionPayload
): TopicTreeStoreLoadAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicTreeStoreActionType.Load
  };
}
