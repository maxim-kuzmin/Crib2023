import {
  type ApiRequestWithInput,
  type TopicDomainListGetOperationInput,
  createApiRequestWithInput,
} from '../../../../../../all';

export interface TopicDomainListGetOperationRequest
  extends ApiRequestWithInput<TopicDomainListGetOperationInput> {}

export function createTopicDomainListGetOperationRequest (
  input: TopicDomainListGetOperationInput,
  operationCode: string = ''
): TopicDomainListGetOperationRequest {
  return createApiRequestWithInput<TopicDomainListGetOperationInput>(
    '@@TopicDomainListGet',
    input,
    operationCode);
}
