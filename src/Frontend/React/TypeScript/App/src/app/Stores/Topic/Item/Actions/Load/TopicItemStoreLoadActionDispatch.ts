import { type TopicItemStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface TopicItemStoreLoadActionDispatch {
  run: (payload: TopicItemStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
