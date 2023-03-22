import {
  type ApiClient,
  type ApiRequestHandler,
  type ApiResult,
  type ArticleDomainListGetOperationInput,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse
} from '../../../../../all';

export interface ArticleDomainListGetOperationRequestHandler {
  handle: (
    request: ArticleDomainListGetOperationRequest
  ) => Promise<ApiResult<ArticleDomainListGetOperationResponse>>;
}

export class ArticleDomainListGetOperationRequestHandlerImpl {
  constructor (
    private readonly apiClient: ApiClient,
    private readonly apiRequestHandler: ApiRequestHandler
  ) {}

  async handle (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ApiResult<ArticleDomainListGetOperationResponse>> {
    const { operationCode, input } = request;

    return await this.apiRequestHandler.handleWithInput<
      ArticleDomainListGetOperationInput,
      ArticleDomainListGetOperationRequest,
      ArticleDomainListGetOperationResponse
    >(
      request,
      async () => await this.apiClient.get<ArticleDomainListGetOperationResponse>(
        'CatalogArticle',
        operationCode,
        input)
    );
  }
}
