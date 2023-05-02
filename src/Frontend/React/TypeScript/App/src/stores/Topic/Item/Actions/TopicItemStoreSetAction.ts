import { type StoreAction } from '../../../../common';
import { type TopicItemStoreSetActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreSetAction extends StoreAction {
  type: TopicItemStoreActionType.Set;
  payload: TopicItemStoreSetActionPayload;
}
