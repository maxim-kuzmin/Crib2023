import { type ShouldBeCanceled } from '../../../../../../common';
import { type TopicTreeStoreLoadActionPayload } from './TopicTreeStoreLoadActionPayload';

export interface TopicTreeStoreLoadActionDispatch {
  readonly run: (payload: TopicTreeStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
