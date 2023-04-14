import { type ApiClient } from '../../data';
import { type ArticleDomainRepository } from './ArticleDomainRepository';
import {
  type ArticleDomainListGetOperationRequest,
  type ArticleDomainItemGetOperationOutput,
  type ArticleDomainItemGetOperationRequest,
  type ArticleDomainItemGetOperationResponse,
  type ArticleDomainListGetOperationResponse,
  type ArticleDomainListGetOperationOutput
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
}
