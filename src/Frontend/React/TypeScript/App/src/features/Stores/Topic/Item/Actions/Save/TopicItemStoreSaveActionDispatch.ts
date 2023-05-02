import { type ShouldBeCanceled } from '../../../../../../common';
import { type TopicItemStoreSaveActionPayload } from './TopicItemStoreSaveActionPayload';

export interface TopicItemStoreSaveActionDispatch {
  readonly run: (
    payload: TopicItemStoreSaveActionPayload,
    shouldBeCanceled?: ShouldBeCanceled
  ) => Promise<void>;
}
