import {
  type ApiRequestWithInput,
  type TopicDomainItemGetOperationInput
} from '../../../../../../all';

export interface TopicDomainItemGetOperationRequest
  extends ApiRequestWithInput<TopicDomainItemGetOperationInput> {}

export function createTopicDomainItemGetOperationRequest (
  input: TopicDomainItemGetOperationInput,
  operationCode: string = ''
): TopicDomainItemGetOperationRequest {
  return {
    operationName: '@@TopicDomainItemGet',
    operationCode,
    input
  };
}
