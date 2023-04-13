import { type StoreAction, type TopicItemStoreActionType } from '../../../../all';

export interface TopicItemStoreClearAction extends StoreAction {
  type: TopicItemStoreActionType.Clear;
}
