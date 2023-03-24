import {
  type ArticleDomainItemGetOperationOutput,
  type ApiRequestHandler,
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationRequestHandler,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainRepository,
  type ShouldBeCanceled
} from '../../../../../../../all';

export class ArticleDomainItemGetOperationRequestHandlerImpl implements ArticleDomainItemGetOperationRequestHandler {
  constructor (
    private readonly repository: ArticleDomainRepository,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

  async handle (
    request: ArticleDomainItemGetOperationRequest,
    shouldBeCanceled: ShouldBeCanceled
  ): Promise<ArticleDomainItemGetOperationResponse | null> {
    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemGetOperationRequest,
      ArticleDomainItemGetOperationOutput,
      ArticleDomainItemGetOperationResponse
    >(
      request,
      async () => await this.repository.getItem(request),
      shouldBeCanceled
    );
  }
}
