import {
  type TopicDomainListGetOperationOutput,
  type ApiRequestHandler,
  type TopicDomainListGetOperationInput,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainListGetOperationResponse,
  type TopicDomainRepository,
  type ShouldBeCanceled
} from '../../../../../../../all';

export class TopicDomainListGetOperationRequestHandlerImpl implements TopicDomainListGetOperationRequestHandler {
  constructor (
    private readonly repository: TopicDomainRepository,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

  async handle (
    request: TopicDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<TopicDomainListGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      TopicDomainListGetOperationInput,
      TopicDomainListGetOperationRequest,
      TopicDomainListGetOperationOutput,
      TopicDomainListGetOperationResponse
    >(
      request,
      async () => await this.repository.getList(request),
      shouldBeCanceled
    );
  }
}
