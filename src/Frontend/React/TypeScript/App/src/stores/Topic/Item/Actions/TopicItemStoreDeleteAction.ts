import { type TopicItemStoreDeleteActionPayload } from '../../../../app';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreDeleteAction extends StoreAction {
  type: TopicItemStoreActionType.Delete;
  payload: TopicItemStoreDeleteActionPayload;
}
