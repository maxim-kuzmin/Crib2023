import { type ShouldBeCanceled } from '../../../../../common';
import { type TopicDomainTreeGetOperationRequest } from './TopicDomainTreeGetOperationRequest';
import { type TopicDomainTreeGetOperationResponse } from './TopicDomainTreeGetOperationResponse';

export interface TopicDomainTreeGetOperationRequestHandler {
  handle: (
    request: TopicDomainTreeGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainTreeGetOperationResponse | null>;
}
