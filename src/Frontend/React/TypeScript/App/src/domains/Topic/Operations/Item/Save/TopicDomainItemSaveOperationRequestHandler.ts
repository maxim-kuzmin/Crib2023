import { type ShouldBeCanceled } from '../../../../../common';
import { type TopicDomainItemGetOperationResponse } from '../Get';
import { type TopicDomainItemSaveOperationRequest } from './TopicDomainItemSaveOperationRequest';

export interface TopicDomainItemSaveOperationRequestHandler {
  handle: (
    request: TopicDomainItemSaveOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainItemGetOperationResponse | null>;
}
