import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreSetActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSetAction
  extends StoreActionWithPayload<TopicItemStoreSetActionPayload> {
  readonly type: TopicItemStoreActionType.Set;
}

export function createTopicItemStoreSetAction (
  options: Omit<TopicItemStoreSetAction, 'type'>
): TopicItemStoreSetAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicItemStoreActionType.Set
  };
}
