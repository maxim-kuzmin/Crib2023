import { type TopicItemStoreLoadActionPayload } from '../../../../app/Stores';
import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadAction extends StoreAction {
  type: TopicItemStoreActionType.Load;
  payload: TopicItemStoreLoadActionPayload;
}
