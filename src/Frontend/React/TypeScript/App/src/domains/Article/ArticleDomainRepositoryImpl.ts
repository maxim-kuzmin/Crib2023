import { type ApiOperationResponse, type ApiClient } from '../../data';
import { type ArticleDomainRepository } from './ArticleDomainRepository';
import {
  type ArticleDomainItemDeleteOperationRequest,
  type ArticleDomainItemGetOperationOutput,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainItemSaveOperationRequest,
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainListGetOperationOutput,
} from './Operations';

const controller = 'CatalogArticle';

interface Options {
  apiClient: ApiClient;
}

export class ArticleDomainRepositoryImpl implements ArticleDomainRepository {
  private readonly apiClient: ApiClient;

  constructor (options: Options) {
    this.apiClient = options.apiClient;
  }

  async deleteItem (
    request: ArticleDomainItemDeleteOperationRequest
  ): Promise<ApiOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.delete(
      `${controller}Item-${Number(input.id ?? 0)}`,
      operationName,
      operationCode
    );
  }

  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<ArticleDomainItemGetOperationOutput>(
      `${controller}Item-${Number(input.id ?? 0)}`,
      operationName,
      operationCode
    );
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<ArticleDomainListGetOperationOutput>(
      `${controller}List`,
      operationName,
      operationCode,
      input
    );
  }

  async saveItem (
    request: ArticleDomainItemSaveOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    const id = Number(input.id ?? 0);

    return id > 0
      ? await this.apiClient.put<ArticleDomainItemGetOperationOutput>(
          `${controller}Item-${id}`,
          operationName,
          operationCode,
          input
        )
      : await this.apiClient.post<ArticleDomainItemGetOperationOutput>(
          `${controller}Item`,
          operationName,
          operationCode,
          input
        );
  }
}
