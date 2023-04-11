import {
  type TopicItemStoreLoadActionPayload,
  type TopicItemStoreActionType
} from '../../../../all';

export interface TopicItemStoreLoadAction {
  type: TopicItemStoreActionType.Load;
  payload: TopicItemStoreLoadActionPayload;
}
