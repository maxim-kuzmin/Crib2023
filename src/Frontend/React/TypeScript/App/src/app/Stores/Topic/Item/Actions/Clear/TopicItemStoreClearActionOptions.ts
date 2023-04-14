import { type StoreActionOptions } from '../../../../../../common';
import { type TopicItemStoreClearActionCallback } from './TopicItemStoreClearActionCallback';

export interface TopicItemStoreClearActionOptions extends StoreActionOptions {
  callback?: TopicItemStoreClearActionCallback;
}
