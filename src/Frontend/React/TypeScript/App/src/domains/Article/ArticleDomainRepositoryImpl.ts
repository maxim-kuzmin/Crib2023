import {
  type ArticleDomainItemGetOperationOutput,
  type ApiClient,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainRepository,
  type ArticleDomainListGetOperationOutput
} from '../../all';

export class ArticleDomainRepositoryImpl implements ArticleDomainRepository {
  constructor (private readonly apiClient: ApiClient) {}
  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, input } = request;

    return await this.apiClient.get<ArticleDomainItemGetOperationOutput>(
      `CatalogArticle/${input.id}`,
      operationCode);
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { operationCode, input } = request;

    return await this.apiClient.get<ArticleDomainListGetOperationOutput>(
      'CatalogArticle',
      operationCode,
      input)
  }
}
