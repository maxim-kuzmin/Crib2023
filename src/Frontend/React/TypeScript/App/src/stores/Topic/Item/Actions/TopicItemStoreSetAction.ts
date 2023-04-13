import {
  type StoreAction,
  type TopicItemStoreActionType,
  type TopicItemStoreSetActionPayload
} from '../../../../all';

export interface TopicItemStoreSetAction extends StoreAction {
  type: TopicItemStoreActionType.Set;
  payload: TopicItemStoreSetActionPayload;
}
