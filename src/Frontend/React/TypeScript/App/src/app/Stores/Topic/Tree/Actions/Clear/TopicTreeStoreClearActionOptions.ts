import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreClearActionCallback } from './TopicTreeStoreClearActionCallback';

export interface TopicTreeStoreClearActionOptions extends StoreActionOptions {
  readonly callback?: TopicTreeStoreClearActionCallback;
}
