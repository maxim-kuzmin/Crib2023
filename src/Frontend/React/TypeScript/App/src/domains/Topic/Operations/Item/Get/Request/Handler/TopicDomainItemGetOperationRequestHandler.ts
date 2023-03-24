import {
  type ShouldBeCanceled,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse
} from '../../../../../../../all';

export interface TopicDomainItemGetOperationRequestHandler {
  handle: (
    request: TopicDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainItemGetOperationResponse | null>;
}
