import { type ShouldBeCanceled } from '../../../../../../common';
import { type TopicItemStoreLoadActionPayload } from './TopicItemStoreLoadActionPayload';

export interface TopicItemStoreLoadActionDispatch {
  run: (payload: TopicItemStoreLoadActionPayload, shouldBeCanceled: ShouldBeCanceled) => void;
}
