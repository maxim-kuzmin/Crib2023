import { type StoreActionOptions } from '../../../../../../common';
import { type TopicTreeStoreLoadCompletedActionCallback } from './TopicTreeStoreLoadCompletedActionCallback';
import { type TopicTreeStoreLoadCompletedActionPayload } from './TopicTreeStoreLoadCompletedActionPayload';

export interface TopicTreeStoreLoadCompletedActionOptions extends StoreActionOptions {
  readonly callback?: TopicTreeStoreLoadCompletedActionCallback;
  readonly payloadOfLoadCompletedAction?: TopicTreeStoreLoadCompletedActionPayload;
}
