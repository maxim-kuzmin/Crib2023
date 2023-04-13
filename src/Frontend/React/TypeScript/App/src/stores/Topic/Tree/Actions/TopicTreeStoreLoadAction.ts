import {
  type TopicTreeStoreLoadActionPayload,
  type TopicTreeStoreActionType,
  type StoreAction
} from '../../../../all';

export interface TopicTreeStoreLoadAction extends StoreAction {
  type: TopicTreeStoreActionType.Load;
  payload: TopicTreeStoreLoadActionPayload;
}
