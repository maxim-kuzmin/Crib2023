import { type TopicTreeStoreClearActionCallback, type StoreActionOptions } from '../../../../../../all';

export interface TopicTreeStoreClearActionOptions extends StoreActionOptions {
  callback?: TopicTreeStoreClearActionCallback;
}
