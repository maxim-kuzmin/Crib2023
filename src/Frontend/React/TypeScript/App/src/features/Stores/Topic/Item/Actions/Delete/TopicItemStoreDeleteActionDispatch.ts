import { type ShouldBeCanceled } from '../../../../../../common';
import { type TopicItemStoreDeleteActionPayload } from './TopicItemStoreDeleteActionPayload';

export interface TopicItemStoreDeleteActionDispatch {
  readonly run: (
    payload: TopicItemStoreDeleteActionPayload,
    shouldBeCanceled?: ShouldBeCanceled
  ) => Promise<void>;
}
