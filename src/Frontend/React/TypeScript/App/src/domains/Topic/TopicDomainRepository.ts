import { type ApiClient, type ApiOperationResponse, type ApiRequestOptionsWithBody } from '../../data';
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
  createTopicDomainItemGetOperationResponse,
  createTopicDomainListGetOperationResponse,
  createTopicDomainTreeGetOperationResponse,
} from './Operations';

export interface TopicDomainRepository {
  deleteItem: (
    request: TopicDomainItemGetOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<ApiOperationResponse>;

  getItem: (
    request: TopicDomainItemGetOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<TopicDomainItemGetOperationResponse>;

  getList: (
    request: TopicDomainListGetOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<TopicDomainListGetOperationResponse>;

  getTree: (
    request: TopicDomainTreeGetOperationRequest,
    abortSignal?: AbortSignal
  ) => Promise<TopicDomainTreeGetOperationResponse>;

  saveItem: (
    request: TopicDomainItemSaveOperationRequest,
    abortSignal?: AbortSignal
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
    request: TopicDomainItemDeleteOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<ApiOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`;

    return await this.clientOfApi.delete({
      abortSignal,
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    });
  }

  async getItem (
    request: TopicDomainItemGetOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`

    const response = await this.clientOfApi.get<TopicDomainItemGetOperationOutput>({
      abortSignal,
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    });

    return createTopicDomainItemGetOperationResponse(response);
  }

  async getList (
    request: TopicDomainListGetOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}List`;

    const response = await this.clientOfApi.get<TopicDomainListGetOperationOutput>({
      abortSignal,
      endpoint,
      operationName,
      operationCode,
      query,
      resourceOfApiResponse
    });

    return createTopicDomainListGetOperationResponse(response);
  }

  async getTree (
    request: TopicDomainTreeGetOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<TopicDomainTreeGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}Tree`;

    const response = await this.clientOfApi.get<TopicDomainTreeGetOperationOutput>({
      abortSignal,
      endpoint,
      operationName,
      operationCode,
      query,
      resourceOfApiResponse
    });

    return createTopicDomainTreeGetOperationResponse(response);
  }

  async saveItem (
    request: TopicDomainItemSaveOperationRequest,
    abortSignal?: AbortSignal
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: body } = request;

    const id = Number(body.id ?? 0);

    const endpoint = id > 0 ? `${controller}Item-${id}` : `${controller}Item`;

    const options: ApiRequestOptionsWithBody = {
      abortSignal,
      body,
      endpoint,
      operationName,
      operationCode,
      resourceOfApiResponse
    };

    const response = id > 0
      ? await this.clientOfApi.put<TopicDomainItemGetOperationOutput>(options)
      : await this.clientOfApi.post<TopicDomainItemGetOperationOutput>(options);

    return createTopicDomainItemGetOperationResponse(response);
  }
}

export function createTopicDomainRepository (options: Options): TopicDomainRepository {
  return new Implementation(options);
}
