import {
  type ShouldBeCanceled,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse
} from '../../../../../../../all';

export interface TopicDomainTreeGetOperationRequestHandler {
  handle: (
    request: TopicDomainTreeGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainTreeGetOperationResponse | null>;
}
