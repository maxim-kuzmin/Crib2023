import {
  type TopicDomainListGetOperationOutput,
  type ApiRequestHandler,
  type TopicDomainListGetOperationInput,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationRequestHandler,
  type TopicDomainListGetOperationResponse,
  type TopicDomainRepository,
  type ShouldBeCanceled
} from '../../../../../all';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

export class TopicDomainListGetOperationRequestHandlerImpl implements TopicDomainListGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

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
