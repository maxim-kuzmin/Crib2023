import { type StoreAction } from '../../../../common';
import { type TopicItemStoreLoadActionPayload } from '../../../../features';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreLoadAction extends StoreAction {
  type: TopicItemStoreActionType.Load;
  payload: TopicItemStoreLoadActionPayload;
}
