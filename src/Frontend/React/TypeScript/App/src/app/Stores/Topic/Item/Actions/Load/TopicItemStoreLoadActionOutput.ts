import { type TopicItemStoreSetActionPayload } from '../Set';

export interface TopicItemStoreLoadActionOutput {
  readonly loading: boolean;
  readonly payload: TopicItemStoreSetActionPayload;
}
