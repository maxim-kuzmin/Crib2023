import { type TopicItemStoreLoadCompletedActionPayload } from './TopicItemStoreLoadCompletedActionPayload';

export interface TopicItemStoreLoadCompletedActionDispatch {
  readonly run: (payload: TopicItemStoreLoadCompletedActionPayload) => void;
}
