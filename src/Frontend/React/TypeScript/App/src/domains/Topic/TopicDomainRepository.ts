import { type ApiOperationResponse, type ApiClient, type ApiRequestOptionsWithBody } from '../../data';
import {
  type TopicDomainItemDeleteOperationRequest,
  type TopicDomainItemGetOperationOutput,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainItemSaveOperationRequest,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainListGetOperationOutput,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse,
  type TopicDomainTreeGetOperationOutput,
} from './Operations';

export interface TopicDomainRepository {
  deleteItem: (
    request: TopicDomainItemGetOperationRequest
  ) => Promise<ApiOperationResponse>;

  getItem: (
    request: TopicDomainItemGetOperationRequest
  ) => Promise<TopicDomainItemGetOperationResponse>;

  getList: (
    request: TopicDomainListGetOperationRequest
  ) => Promise<TopicDomainListGetOperationResponse>;

  getTree: (
    request: TopicDomainTreeGetOperationRequest
  ) => Promise<TopicDomainTreeGetOperationResponse>;

  saveItem: (
    request: TopicDomainItemSaveOperationRequest
  ) => Promise<TopicDomainItemGetOperationResponse>;
}

const controller = 'CatalogTopic';

interface Options {
  clientOfApi: ApiClient;
}

class Implementation implements TopicDomainRepository {
  private readonly clientOfApi: ApiClient;

  constructor (options: Options) {
    this.clientOfApi = options.clientOfApi;
  }

  async deleteItem (
    request: TopicDomainItemDeleteOperationRequest
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
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`

    return await this.clientOfApi.get<TopicDomainItemGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async getList (
    request: TopicDomainListGetOperationRequest
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}List`;

    return await this.clientOfApi.get<TopicDomainListGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      query,
      resourceOfApiResponse
    });
  }

  async getTree (
    request: TopicDomainTreeGetOperationRequest
  ): Promise<TopicDomainTreeGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}Tree`;

    return await this.clientOfApi.get<TopicDomainTreeGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      query,
      resourceOfApiResponse
    });
  }

  async saveItem (
    request: TopicDomainItemSaveOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
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
      ? await this.clientOfApi.put<TopicDomainItemGetOperationOutput>(options)
      : await this.clientOfApi.post<TopicDomainItemGetOperationOutput>(options);
  }
}

export function createTopicDomainRepository (options: Options): TopicDomainRepository {
  return new Implementation(options);
}
