import {
  type ApiRequestWithInput,
  type TopicDomainItemGetOperationInput,
  createApiRequestWithInput,
} from '../../../../../../all';

export interface TopicDomainItemGetOperationRequest
  extends ApiRequestWithInput<TopicDomainItemGetOperationInput> {}

export function createTopicDomainItemGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  operationCode: string = ''
): TopicDomainItemGetOperationRequest {
  return createApiRequestWithInput<TopicDomainItemGetOperationInput>(
    '@@TopicDomainItemGet',
    input,
    operationCode);
}
