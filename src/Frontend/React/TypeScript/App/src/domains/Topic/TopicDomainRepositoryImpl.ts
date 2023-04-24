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
import { type TopicDomainRepository } from './TopicDomainRepository';

const controller = 'CatalogTopic';

interface Options {
  apiClient: ApiClient;
}

export class TopicDomainRepositoryImpl implements TopicDomainRepository {
  private readonly apiClient: ApiClient;

  constructor (options: Options) {
    this.apiClient = options.apiClient;
  }

  async deleteItem (
    request: TopicDomainItemDeleteOperationRequest
  ): Promise<ApiOperationResponse> {
    const { operationCode, operationName, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`;

    return await this.apiClient.delete({
      endpoint,
      operationName,
      operationCode
    });
  }

  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    const endpoint = `${controller}Item-${Number(input.id ?? 0)}`

    return await this.apiClient.get<TopicDomainItemGetOperationOutput>({
      endpoint,
      operationName,
      operationCode
    });
  }

  async getList (
    request: TopicDomainListGetOperationRequest
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName, input: query } = request;

    const endpoint = `${controller}List`;

    return await this.apiClient.get<TopicDomainListGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      query
    });
  }

  async getTree (
    request: TopicDomainTreeGetOperationRequest
  ): Promise<TopicDomainTreeGetOperationResponse> {
    const { operationCode, operationName, input: query } = request;

    const endpoint = `${controller}Tree`;

    return await this.apiClient.get<TopicDomainTreeGetOperationOutput>({
      endpoint,
      operationName,
      operationCode,
      query
    });
  }

  async saveItem (
    request: TopicDomainItemSaveOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input: body } = request;

    const id = Number(body.id ?? 0);

    const endpoint = id > 0 ? `${controller}Item-${id}` : `${controller}Item`;

    const options: ApiRequestOptionsWithBody = {
      body,
      endpoint,
      operationName,
      operationCode
    };

    return id > 0
      ? await this.apiClient.put<TopicDomainItemGetOperationOutput>(options)
      : await this.apiClient.post<TopicDomainItemGetOperationOutput>(options);
  }
}
