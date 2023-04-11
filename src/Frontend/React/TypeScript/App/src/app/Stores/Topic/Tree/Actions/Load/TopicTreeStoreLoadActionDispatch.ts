import { type TopicTreeStoreLoadActionPayload, type ShouldBeCanceled } from '../../../../../../all';

export interface TopicTreeStoreLoadActionDispatch {
  run: (input: TopicTreeStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
