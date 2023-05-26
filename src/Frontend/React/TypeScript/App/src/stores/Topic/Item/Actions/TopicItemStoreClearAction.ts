import { type StoreActionWithPayload, createStoreActionWithPayload } from '../../../../common';
import { type TopicItemStoreClearActionPayload } from '../../../../features';
import { TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreClearAction
  extends StoreActionWithPayload<TopicItemStoreClearActionPayload> {
  readonly type: TopicItemStoreActionType.Clear;
}

export function createTopicItemStoreClearAction (
  options: Omit<TopicItemStoreClearAction, 'type'>
): TopicItemStoreClearAction {
  const { payload } = options;

  const base = createStoreActionWithPayload({ payload });

  return {
    ...base,
    type: TopicItemStoreActionType.Clear
  };
}
