import { type TopicItemStoreSetActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSetAction extends StoreAction {
  type: TopicItemStoreActionType.Set;
  payload: TopicItemStoreSetActionPayload;
}
