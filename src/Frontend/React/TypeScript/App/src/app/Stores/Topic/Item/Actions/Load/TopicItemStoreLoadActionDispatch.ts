import { type TopicItemStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface TopicItemStoreLoadActionDispatch {
  run: (input: TopicItemStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
