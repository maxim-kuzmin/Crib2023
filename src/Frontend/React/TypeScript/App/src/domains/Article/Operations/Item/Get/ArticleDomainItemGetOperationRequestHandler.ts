import {
  type ApiClient,
  type ApiRequestHandler,
  type ArticleDomainItemGetOperationInput,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemGetOperationResult
} from '../../../../../all';

export interface ArticleDomainItemGetOperationRequestHandler {
  handle: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResult>;
}

export class ArticleDomainItemGetOperationRequestHandlerImpl {
  constructor (
    private readonly apiClient: ApiClient,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

  async handle (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResult> {
    const { operationCode, input } = request;

    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainItemGetOperationInput,
      ArticleDomainItemGetOperationRequest,
      ArticleDomainItemGetOperationResponse
    >(
      request,
      async () => await this.apiClient.get<ArticleDomainItemGetOperationResponse>(
        `CatalogArticle/${input.id}`,
        operationCode)
    );
  }
}
