import {
  type TopicDomainTreeGetOperationOutput,
  type ApiRequestHandler,
  type TopicDomainTreeGetOperationInput,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationRequestHandler,
  type TopicDomainTreeGetOperationResponse,
  type TopicDomainRepository,
  type ShouldBeCanceled
} from '../../../../../all';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: TopicDomainRepository;
}

export class TopicDomainTreeGetOperationRequestHandlerImpl implements TopicDomainTreeGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: TopicDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

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
