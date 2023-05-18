import { type ApiOperationResponse, type ApiClient, type ApiRequestOptionsWithBody } from '../../data';
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

export interface ArticleDomainRepository {
  deleteItem: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ApiOperationResponse>;

  getItem: (
    request: ArticleDomainItemGetOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResponse>;

  getList: (
    request: ArticleDomainListGetOperationRequest
  ) => Promise<ArticleDomainListGetOperationResponse>;

  saveItem: (
    request: ArticleDomainItemSaveOperationRequest
  ) => Promise<ArticleDomainItemGetOperationResponse>;
}

const controller = 'CatalogArticle';

interface Options {
  clientOfApi: ApiClient;
}

class Implementation implements ArticleDomainRepository {
  private readonly clientOfApi: ApiClient;

  constructor (options: Options) {
    this.clientOfApi = options.clientOfApi;
  }

  async deleteItem (
    request: ArticleDomainItemDeleteOperationRequest
  ): Promise<ApiOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`;

    return await this.clientOfApi.delete({
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async getItem (
    request: ArticleDomainItemGetOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`;

    return await this.clientOfApi.get<ArticleDomainItemGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async getList (
    request: ArticleDomainListGetOperationRequest
  ): Promise<ArticleDomainListGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}List`;

    return await this.clientOfApi.get<ArticleDomainListGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      query,
      resourceOfApiResponse
    });
  }

  async saveItem (
    request: ArticleDomainItemSaveOperationRequest
  ): Promise<ArticleDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: body } = request;

    const id = Number(body.id ?? 0);

    const endpoint = id > 0 ? `${controller}Item-${id}` : `${controller}Item`;

    const options: ApiRequestOptionsWithBody = {
      body,
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    };

    return id > 0
      ? await this.clientOfApi.put<ArticleDomainItemGetOperationOutput>(options)
      : await this.clientOfApi.post<ArticleDomainItemGetOperationOutput>(options);
  }
}

export function createArticleDomainRepository (options: Options): ArticleDomainRepository {
  return new Implementation(options);
}
