import { type TopicTreeStoreSetActionPayload } from '../Set';

export interface TopicTreeStoreLoadActionOutput {
  readonly loading: boolean;
  readonly payload: TopicTreeStoreSetActionPayload;
}
