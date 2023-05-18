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

    try {
      return await this.clientOfApi.delete({
        endpoint,
        operationName,
        operationCode,
        resourceOfApiResponse
      });
    } catch (error: unknown) {
      const response = error as ApiOperationResponse;

      if (response) {
        return response;
      }

      throw error;
    }
  }

  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`

    try {
      const response = await this.clientOfApi.get<TopicDomainItemGetOperationOutput>({
        endpoint,
        operationName,
        operationCode,
        resourceOfApiResponse
      });

      return createTopicDomainItemGetOperationResponse(response);
    } catch (error: unknown) {
      const response = error as ApiOperationResponse;

      if (response) {
        return createTopicDomainItemGetOperationResponse(response);
      }

      throw error;
    }
  }

  async getList (
    request: TopicDomainListGetOperationRequest
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}List`;

    try {
      const response = await this.clientOfApi.get<TopicDomainListGetOperationOutput>({
        endpoint,
        operationName,
        operationCode,
        query,
        resourceOfApiResponse
      });

      return createTopicDomainListGetOperationResponse(response);
    } catch (error: unknown) {
      const response = error as ApiOperationResponse;

      if (response) {
        return createTopicDomainListGetOperationResponse(response);
      }

      throw error;
    }
  }

  async getTree (
    request: TopicDomainTreeGetOperationRequest
  ): Promise<TopicDomainTreeGetOperationResponse> {
    const { operationCode, operationName, resourceOfApiResponse, input: query } = request;

    const endpoint = `${controller}Tree`;

    try {
      const response = await this.clientOfApi.get<TopicDomainTreeGetOperationOutput>({
        endpoint,
        operationName,
        operationCode,
        query,
        resourceOfApiResponse
      });

      return createTopicDomainTreeGetOperationResponse(response);
    } catch (error: unknown) {
      const response = error as ApiOperationResponse;

      if (response) {
        return createTopicDomainTreeGetOperationResponse(response);
      }

      throw error;
    }
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

    try {
      const response = id > 0
        ? await this.clientOfApi.put<TopicDomainItemGetOperationOutput>(options)
        : await this.clientOfApi.post<TopicDomainItemGetOperationOutput>(options);

      return createTopicDomainItemGetOperationResponse(response);
    } catch (error: unknown) {
      const response = error as ApiOperationResponse;

      if (response) {
        return createTopicDomainItemGetOperationResponse(response);
      }

      throw error;
    }
  }
}

export function createTopicDomainRepository (options: Options): TopicDomainRepository {
  return new Implementation(options);
}
