import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreLoadActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadAction
  extends StoreActionWithPayload<TopicItemStoreLoadActionPayload> {
  readonly type: TopicItemStoreActionType.Load;
}

export function createTopicItemStoreLoadAction (
  payload: TopicItemStoreLoadActionPayload
): TopicItemStoreLoadAction {
  const base = createStoreActionWithPayload(payload);

  return {
    ...base,
    type: TopicItemStoreActionType.Load
  };
}
