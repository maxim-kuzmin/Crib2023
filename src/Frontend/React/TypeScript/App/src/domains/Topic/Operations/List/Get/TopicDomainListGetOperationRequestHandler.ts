import { type ShouldBeCanceled } from '../../../../../common';
import { type TopicDomainListGetOperationRequest } from './TopicDomainListGetOperationRequest';
import { type TopicDomainListGetOperationResponse } from './TopicDomainListGetOperationResponse';

export interface TopicDomainListGetOperationRequestHandler {
  handle: (
    request: TopicDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainListGetOperationResponse | null>;
}
