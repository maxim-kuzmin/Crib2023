import {
  type ShouldBeCanceled,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse
} from '../../../../../../../all';

export interface TopicDomainListGetOperationRequestHandler {
  handle: (
    request: TopicDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ) => Promise<TopicDomainListGetOperationResponse | null>;
}
