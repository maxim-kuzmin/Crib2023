import { type StoreAction } from '../../../../common';
import { type TopicItemStoreActionType } from '../TopicItemStoreActionType';

export interface TopicItemStoreClearAction extends StoreAction {
  type: TopicItemStoreActionType.Clear;
}
