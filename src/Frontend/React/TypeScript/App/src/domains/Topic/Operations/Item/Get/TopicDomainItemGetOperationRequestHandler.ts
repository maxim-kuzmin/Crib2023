import { type ShouldBeCanceled } from '../../../../../common';
import { type TopicDomainItemGetOperationRequest } from './TopicDomainItemGetOperationRequest';
import { type TopicDomainItemGetOperationResponse } from './TopicDomainItemGetOperationResponse';

export interface TopicDomainItemGetOperationRequestHandler {
  handle: (
    request: TopicDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainItemGetOperationResponse | null>;
}
