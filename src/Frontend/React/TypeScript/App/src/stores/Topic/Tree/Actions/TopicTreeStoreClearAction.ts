import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreClearAction extends StoreAction {
  type: TopicTreeStoreActionType.Clear;
}
