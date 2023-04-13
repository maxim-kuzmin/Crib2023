import { type StoreAction, type TopicTreeStoreActionType } from '../../../../all';

export interface TopicTreeStoreClearAction extends StoreAction {
  type: TopicTreeStoreActionType.Clear;
}
