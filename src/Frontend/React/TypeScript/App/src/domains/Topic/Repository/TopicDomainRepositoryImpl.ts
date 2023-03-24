import {
  type TopicDomainItemGetOperationOutput,
  type ApiClient,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainRepository,
  type TopicDomainListGetOperationOutput
} from '../../../all';

export class TopicDomainRepositoryImpl implements TopicDomainRepository {
  constructor (private readonly apiClient: ApiClient) {}
  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<TopicDomainItemGetOperationOutput>(
      `CatalogTopic/${input.id ?? 0}`,
      operationName,
      operationCode
    );
  }

  async getList (
    request: TopicDomainListGetOperationRequest
  ): Promise<TopicDomainListGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<TopicDomainListGetOperationOutput>(
      'CatalogTopic',
      operationName,
      operationCode,
      input
    );
  }
}
