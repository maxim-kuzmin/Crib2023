import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicTreeStoreClearActionPayload } from '../../../../features';
import { TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreClearAction
  extends StoreActionWithPayload<TopicTreeStoreClearActionPayload> {
  readonly type: TopicTreeStoreActionType.Clear;
}

export function createTopicTreeStoreClearAction (
  payload: TopicTreeStoreClearActionPayload
): TopicTreeStoreClearAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicTreeStoreActionType.Clear
  };
}
