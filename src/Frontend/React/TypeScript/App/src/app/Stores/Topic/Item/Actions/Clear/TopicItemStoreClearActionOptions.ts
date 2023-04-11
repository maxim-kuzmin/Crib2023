import { type TopicItemStoreClearActionCallback, type StoreActionOptions } from '../../../../../../all';

export interface TopicItemStoreClearActionOptions extends StoreActionOptions {
  callback?: TopicItemStoreClearActionCallback;
}
