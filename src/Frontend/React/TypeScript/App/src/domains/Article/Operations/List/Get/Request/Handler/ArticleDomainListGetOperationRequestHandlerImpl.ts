import {
  type ArticleDomainListGetOperationOutput,
  type ApiRequestHandler,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationRequestHandler,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainRepository,
  type ShouldBeCanceled
} from '../../../../../../../all';

export class ArticleDomainListGetOperationRequestHandlerImpl implements ArticleDomainListGetOperationRequestHandler {
  constructor (
    private readonly repository: ArticleDomainRepository,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

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
