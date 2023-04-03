import {
  type TopicDomainItemGetOperationOutput,
  type ApiClient,
  type TopicDomainItemGetOperationRequest,
  type TopicDomainItemGetOperationResponse,
  type TopicDomainListGetOperationRequest,
  type TopicDomainListGetOperationResponse,
  type TopicDomainRepository,
  type TopicDomainListGetOperationOutput,
  type TopicDomainTreeGetOperationRequest,
  type TopicDomainTreeGetOperationResponse,
  type TopicDomainTreeGetOperationOutput
} from '../../../all';

const controller = 'CatalogTopic';

export class TopicDomainRepositoryImpl implements TopicDomainRepository {
  constructor (private readonly apiClient: ApiClient) {}
  async getItem (
    request: TopicDomainItemGetOperationRequest
  ): Promise<TopicDomainItemGetOperationResponse> {
    const { operationCode, operationName, input } = request;

    return await this.apiClient.get<TopicDomainItemGetOperationOutput>(
      `${controller}Item-${input.id ?? 0}`,
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
}
