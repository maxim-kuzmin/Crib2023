import { type ShouldBeCanceled } from '../../../../../../common';
import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionDispatch {
  run: (payload: TopicTreeStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
