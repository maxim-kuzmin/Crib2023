import { type ApiOperationResponse, type ApiClient, type ApiRequestOptionsWithBody } from '../../data';
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
    const { factoryOfApiResponse, operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`;

    return await this.apiClient.delete({
      endpoint,
      factoryOfApiResponse,
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { factoryOfApiResponse, operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`;

    return await this.apiClient.get<ArticleDomainItemGetOperationOutput>({
      endpoint,
      factoryOfApiResponse,
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { factoryOfApiResponse, operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}List`;

    return await this.apiClient.get<ArticleDomainListGetOperationOutput>({
      endpoint,
      factoryOfApiResponse,
      operationName,
      operationCode,
      query,
      resourceOfApiResponse
    });
  }

  async saveItem (
    request: ArticleDomainItemSaveOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { factoryOfApiResponse, operationCode, operationName, resourceOfApiResponse, input: body } = request;

    const id = Number(body.id ?? 0);

    const endpoint = id > 0 ? `${controller}Item-${id}` : `${controller}Item`;

    const options: ApiRequestOptionsWithBody = {
      body,
      endpoint,
      factoryOfApiResponse,
      operationName,
      operationCode,
      resourceOfApiResponse
    };

    return id > 0
      ? await this.apiClient.put<ArticleDomainItemGetOperationOutput>(options)
      : await this.apiClient.post<ArticleDomainItemGetOperationOutput>(options);
  }
}
