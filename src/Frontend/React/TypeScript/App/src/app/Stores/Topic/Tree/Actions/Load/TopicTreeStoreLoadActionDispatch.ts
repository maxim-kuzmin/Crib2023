import { type TopicTreeStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface TopicTreeStoreLoadActionDispatch {
  run: (payload: TopicTreeStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
