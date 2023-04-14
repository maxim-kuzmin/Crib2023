import {
  type ArticleDomainListGetOperationOutput,
  type ApiRequestHandler,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainRepository,
  type ShouldBeCanceled
} from '../../../../../all';

interface Options {
  apiRequestHandler: ApiRequestHandler;
  repository: ArticleDomainRepository;
}

export class ArticleDomainListGetOperationRequestHandlerImpl implements ArticleDomainListGetOperationRequestHandler {
  private readonly apiRequestHandler: ApiRequestHandler;
  private readonly repository: ArticleDomainRepository;

  constructor (options: Options) {
    this.apiRequestHandler = options.apiRequestHandler;
    this.repository = options.repository;
  }

  async handle (
    request: ArticleDomainListGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ArticleDomainListGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainListGetOperationInput,
      ArticleDomainListGetOperationRequest,
      ArticleDomainListGetOperationOutput,
      ArticleDomainListGetOperationResponse
    >(
      request,
      async () => await this.repository.getList(request),
      shouldBeCanceled
    );
  }
}
