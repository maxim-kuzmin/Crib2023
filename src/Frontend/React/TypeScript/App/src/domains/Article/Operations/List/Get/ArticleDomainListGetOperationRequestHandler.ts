import {
  type ApiClient,
  type ApiRequestHandler,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainListGetOperationResult
} from '../../../../../all';

export interface ArticleDomainListGetOperationRequestHandler {
  handle: (
    request: ArticleDomainListGetOperationRequest
  ) => Promise<ArticleDomainListGetOperationResult | null>;
}

export class ArticleDomainListGetOperationRequestHandlerImpl {
  constructor (
    private readonly apiClient: ApiClient,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

  async handle (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResult | null> {
    const { operationCode, input } = request;

    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainListGetOperationInput,
      ArticleDomainListGetOperationRequest,
      ArticleDomainListGetOperationResponse,
      ArticleDomainListGetOperationResult
    >(
      request,
      async () => await this.apiClient.get<ArticleDomainListGetOperationResponse>(
        'CatalogArticle',
        operationCode,
        input)
    );
  }
}
