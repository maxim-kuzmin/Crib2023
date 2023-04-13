import {
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreActionType,
  type StoreAction
} from '../../../../all';

export interface TopicItemStoreLoadAction extends StoreAction {
  type: TopicItemStoreActionType.Load;
  payload: TopicItemStoreLoadActionPayload;
}
