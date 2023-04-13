import {
  type ApiRequestWithInput,
  type TopicDomainListGetOperationInput
} from '../../../../../all';

export interface TopicDomainListGetOperationRequest
  extends ApiRequestWithInput<TopicDomainListGetOperationInput> {}

export function createTopicDomainListGetOperationRequest (
  input: TopicDomainListGetOperationInput,
  operationCode: string = ''
): TopicDomainListGetOperationRequest {
  return {
    operationName: '@@TopicDomainListGet',
    operationCode,
    input
  };
}
