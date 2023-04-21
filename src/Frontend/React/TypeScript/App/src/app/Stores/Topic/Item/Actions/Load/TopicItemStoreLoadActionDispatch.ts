import { type ShouldBeCanceled } from '../../../../../../common';
import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionDispatch {
  readonly run: (
    payload: TopicItemStoreLoadActionPayload,
    shouldBeCanceled?: ShouldBeCanceled
  ) => Promise<void>;
}
