import {
  type TopicItemStoreActionType,
  type TopicItemStoreSetActionPayload
} from '../../../../all';

export interface TopicItemStoreSetAction {
  type: TopicItemStoreActionType.Set;
  payload: TopicItemStoreSetActionPayload;
}
