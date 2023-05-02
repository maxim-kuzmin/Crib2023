import { type StoreAction } from '../../../../common';
import { type TopicTreeStoreLoadActionPayload } from '../../../../features';
import { type TopicTreeStoreActionType } from '../TopicTreeStoreActionType';

export interface TopicTreeStoreLoadAction extends StoreAction {
  type: TopicTreeStoreActionType.Load;
  payload: TopicTreeStoreLoadActionPayload;
}
