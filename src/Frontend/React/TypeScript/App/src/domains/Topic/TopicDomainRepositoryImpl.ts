import { type ApiOperationResponse, type ApiClient } from '../../data';
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

    return await this.apiClient.delete(
      `${controller}Item-${Number(input.id ?? 0)}`,
      operationName,
      operationCode
    );
  }

  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<TopicDomainItemGetOperationOutput>(
      `${controller}Item-${Number(input.id ?? 0)}`,
      operationName,
      operationCode
    );
  }

  async getList (
    request: TopicDomainListGetOperationRequest
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<TopicDomainListGetOperationOutput>(
      `${controller}List`,
      operationName,
      operationCode,
      input
    );
  }

  async getTree (
    request: TopicDomainTreeGetOperationRequest
  ): Promise<TopicDomainTreeGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<TopicDomainTreeGetOperationOutput>(
      `${controller}Tree`,
      operationName,
      operationCode,
      input
    );
  }

  async saveItem (
    request: TopicDomainItemSaveOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    const id = Number(input.id ?? 0);

    return id > 0
      ? await this.apiClient.put<TopicDomainItemGetOperationOutput>(
          `${controller}Item-${id}`,
          operationName,
          operationCode,
          input
        )
      : await this.apiClient.post<TopicDomainItemGetOperationOutput>(
          `${controller}Item`,
          operationName,
          operationCode,
          input
        );
  }
}
