import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreClearActionCallback } from './TopicTreeStoreClearActionCallback';

export interface TopicTreeStoreClearActionOptions extends StoreActionOptions {
  callback?: TopicTreeStoreClearActionCallback;
}
