import {
  type TopicDomainTreeGetOperationOutput,
  type ApiRequestHandler,
  type TopicDomainTreeGetOperationInput,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationRequestHandler,
  type TopicDomainTreeGetOperationResponse,
  type TopicDomainRepository,
  type ShouldBeCanceled
} from '../../../../../../../all';

export class TopicDomainTreeGetOperationRequestHandlerImpl implements TopicDomainTreeGetOperationRequestHandler {
  constructor (
    private readonly repository: TopicDomainRepository,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

  async handle (
    request: TopicDomainTreeGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainTreeGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      TopicDomainTreeGetOperationInput,
      TopicDomainTreeGetOperationRequest,
      TopicDomainTreeGetOperationOutput,
      TopicDomainTreeGetOperationResponse
    >(
      request,
      async () => await this.repository.getTree(request),
      shouldBeCanceled
    );
  }
}
