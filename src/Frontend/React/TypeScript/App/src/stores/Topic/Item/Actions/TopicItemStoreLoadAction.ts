import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreLoadActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadAction
  extends StoreActionWithPayload<TopicItemStoreLoadActionPayload> {
  readonly type: TopicItemStoreActionType.Load;
}

export function createTopicItemStoreLoadAction (
  options: Omit<TopicItemStoreLoadAction, 'type'>
): TopicItemStoreLoadAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicItemStoreActionType.Load
  };
}
