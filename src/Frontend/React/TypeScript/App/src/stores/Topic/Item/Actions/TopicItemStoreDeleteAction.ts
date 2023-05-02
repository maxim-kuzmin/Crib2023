import { type StoreAction } from '../../../../common';
import { type TopicItemStoreDeleteActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteAction extends StoreAction {
  type: TopicItemStoreActionType.Delete;
  payload: TopicItemStoreDeleteActionPayload;
}
