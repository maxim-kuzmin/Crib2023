import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreDeleteActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteAction
  extends StoreActionWithPayload<TopicItemStoreDeleteActionPayload> {
  readonly type: TopicItemStoreActionType.Delete;
}

export function createTopicItemStoreDeleteAction (
  options: Omit<TopicItemStoreDeleteAction, 'type'>
): TopicItemStoreDeleteAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicItemStoreActionType.Delete
  };
}
